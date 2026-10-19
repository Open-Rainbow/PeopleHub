using PeopleHub.Application.Modules.Payroll.Contracts;

namespace PeopleHub.Application.Modules.Payroll.Calculation;

/// <summary>
/// All payroll money maths, kept pure so it can be unit tested (no database, no clock).
/// Amounts are rounded to whole rupees (away from zero); ESI is rounded up, as the ESIC rules require.
/// </summary>
public static class PayrollCalculator
{
    public const string Basic = "BASIC";
    public const string Hra = "HRA";

    // ---- Structure ------------------------------------------------------------------------------

    /// <summary>Splits an annual CTC into monthly components (CTC = gross + employer PF + employer ESI).</summary>
    public static SalaryBreakdownDto Structure(
        decimal annualCtc, bool pfApplicable, IReadOnlyList<PayComponentDto> components, PayrollSettingsDto settings, IReadOnlyList<PtSlabDto> ptSlabs)
    {
        var result = new SalaryBreakdownDto { AnnualCtc = annualCtc, PfApplicable = pfApplicable && settings.PfEnabled };
        var monthlyCtc = Math.Round(annualCtc / 12m, 2);
        result.MonthlyCtc = monthlyCtc;

        var ordered = components.OrderBy(c => c.SortOrder).ToList();
        var basicRule = ordered.FirstOrDefault(c => c.Code.Equals(Basic, StringComparison.OrdinalIgnoreCase));
        var basic = basicRule is null ? 0 : Rupees(basicRule.CalcType switch
        {
            "PctCtc" => monthlyCtc * basicRule.Value / 100m,
            "Fixed" => basicRule.Value,
            _ => 0,
        });

        var amounts = new Dictionary<string, decimal>(StringComparer.OrdinalIgnoreCase);
        foreach (var c in ordered.Where(c => c.CalcType != "Balance"))
        {
            amounts[c.Code] = c.Code.Equals(Basic, StringComparison.OrdinalIgnoreCase) ? basic : Rupees(c.CalcType switch
            {
                "PctCtc" => monthlyCtc * c.Value / 100m,
                "PctBasic" => basic * c.Value / 100m,
                "Fixed" => c.Value,
                _ => 0,
            });
        }

        var employerPf = result.PfApplicable ? Pf(basic, settings) : 0;
        var available = monthlyCtc - employerPf;

        // ESI is part of CTC too: gross * (1 + employer rate) = available.
        var erRate = settings.EsiEmployerRate / 100m;
        var grossIfEsi = Math.Floor(available / (1 + erRate));
        result.EsiApplicable = settings.EsiEnabled && grossIfEsi <= settings.EsiWageLimit;
        var gross = result.EsiApplicable ? grossIfEsi : Math.Round(available, 0, MidpointRounding.AwayFromZero);
        var employerEsi = result.EsiApplicable ? Math.Round(available - gross, 0, MidpointRounding.AwayFromZero) : 0;

        var fixedTotal = amounts.Values.Sum();
        var balanceRule = ordered.FirstOrDefault(c => c.CalcType == "Balance");
        var balance = gross - fixedTotal;
        if (balance < 0)
        {
            result.Warnings.Add("The fixed components add up to more than the CTC allows. Lower them or raise the CTC.");
            balance = 0;
        }
        if (balanceRule is not null) amounts[balanceRule.Code] = balance;
        else if (balance > 0) result.Warnings.Add("No component takes the balance, so part of the CTC is not paid out.");

        foreach (var c in ordered)
        {
            if (!amounts.TryGetValue(c.Code, out var monthly)) continue;
            result.Lines.Add(new SalaryLineDto(c.Code, c.Name, "Earning", monthly, monthly * 12, c.IsTaxable));
        }

        result.MonthlyGross = result.Lines.Sum(l => l.Monthly);
        result.MonthlyTaxable = result.Lines.Where(l => l.IsTaxable).Sum(l => l.Monthly);

        if (employerPf > 0) result.Lines.Add(new SalaryLineDto("PF_ER", "Employer PF", "Employer", employerPf, employerPf * 12, false));
        if (employerEsi > 0) result.Lines.Add(new SalaryLineDto("ESI_ER", "Employer ESI", "Employer", employerEsi, employerEsi * 12, false));

        var employeePf = result.PfApplicable ? Pf(basic, settings) : 0;
        var employeeEsi = result.EsiApplicable ? Esi(result.MonthlyGross, settings.EsiEmployeeRate) : 0;
        var pt = settings.PtEnabled ? ProfessionalTax(result.MonthlyGross, settings.PtState, ptSlabs) : 0;
        if (employeePf > 0) result.Lines.Add(new SalaryLineDto("PF", "Provident fund", "Deduction", employeePf, employeePf * 12, false));
        if (employeeEsi > 0) result.Lines.Add(new SalaryLineDto("ESI", "ESI", "Deduction", employeeEsi, employeeEsi * 12, false));
        if (pt > 0) result.Lines.Add(new SalaryLineDto("PT", "Professional tax", "Deduction", pt, pt * 12, false));

        result.MonthlyDeductions = employeePf + employeeEsi + pt;
        result.MonthlyNetBeforeTax = result.MonthlyGross - result.MonthlyDeductions;
        return result;
    }

    // ---- Monthly payslip ------------------------------------------------------------------------

    public static PayslipComputation Payslip(
        RunInputRow input, int month, IReadOnlyList<PayComponentDto> components, PayrollSettingsDto settings, IReadOnlyList<PtSlabDto> ptSlabs)
    {
        var structure = Structure(input.AnnualCtc, input.PfApplicable, components, settings, ptSlabs);
        var warnings = new List<string>(structure.Warnings);
        var days = Math.Max(1, input.DaysInMonth);

        var lop = input.LopOverride ?? input.PreJoinDays + input.UnpaidLeaveDays + input.AbsentDays;
        lop = Math.Clamp(lop, 0, days);
        var paid = days - lop;
        var factor = paid / days;

        var slip = new PayslipComputation
        {
            EmployeeId = input.EmployeeId,
            EmployeeName = input.EmployeeName,
            Department = input.Department,
            Designation = input.Designation,
            Pan = input.Pan,
            Uan = input.Uan,
            BankName = input.BankName,
            BankAccount = input.BankAccount,
            Ifsc = input.Ifsc,
            TaxRegime = PayrollRules.Canonical(PayrollRules.Regimes, input.TaxRegime) ?? "New",
            DaysInMonth = days,
            PaidDays = paid,
            LopDays = lop,
            AnnualCtc = input.AnnualCtc,
        };

        // Earnings
        var rules = components.ToDictionary(c => c.Code, StringComparer.OrdinalIgnoreCase);
        decimal taxable = 0, basicEarned = 0, hraEarned = 0;
        foreach (var line in structure.Lines.Where(l => l.Kind == "Earning"))
        {
            var prorated = !rules.TryGetValue(line.Code, out var rule) || rule.IsProrated;
            var amount = paid <= 0 ? 0 : prorated ? Rupees(line.Monthly * factor) : line.Monthly;
            if (amount <= 0) continue;
            slip.Lines.Add(new PayslipLineDto(line.Code, line.Name, "Earning", amount));
            if (line.IsTaxable) taxable += amount;
            if (line.Code.Equals(Basic, StringComparison.OrdinalIgnoreCase)) basicEarned = amount;
            if (line.Code.Equals(Hra, StringComparison.OrdinalIgnoreCase)) hraEarned = amount;
        }

        var adjustments = input.Adjustments();
        foreach (var a in adjustments.Where(a => a.Kind == "Earning"))
        {
            slip.Lines.Add(new PayslipLineDto($"ADJ{a.Id}", a.Label, "Earning", Rupees(a.Amount)));
            if (a.IsTaxable) taxable += Rupees(a.Amount);
        }

        slip.Gross = slip.Lines.Sum(l => l.Amount);
        slip.TaxableGross = taxable;

        // Statutory deductions
        if (structure.PfApplicable)
        {
            slip.EmployeePf = Pf(basicEarned, settings);
            slip.EmployerPf = slip.EmployeePf;
        }

        if (structure.EsiApplicable && slip.Gross > 0)
        {
            slip.EmployeeEsi = Esi(slip.Gross, settings.EsiEmployeeRate);
            slip.EmployerEsi = Esi(slip.Gross, settings.EsiEmployerRate);
        }

        if (settings.PtEnabled && slip.Gross > 0)
            slip.ProfessionalTax = ProfessionalTax(slip.Gross, settings.PtState, ptSlabs);

        // Income tax: project the year, take what is still due, spread it over the months left.
        var monthsLeft = PayrollRules.MonthsLeftInFy(month);
        var futureMonths = monthsLeft - 1;
        var projectedGross = input.YtdTaxable + taxable + structure.MonthlyTaxable * futureMonths;
        var structurePf = structure.Lines.FirstOrDefault(l => l.Code == "PF")?.Monthly ?? 0;
        var structurePt = structure.Lines.FirstOrDefault(l => l.Code == "PT")?.Monthly ?? 0;
        var basicLine = structure.Lines.FirstOrDefault(l => l.Code.Equals(Basic, StringComparison.OrdinalIgnoreCase))?.Monthly ?? 0;
        var hraLine = structure.Lines.FirstOrDefault(l => l.Code.Equals(Hra, StringComparison.OrdinalIgnoreCase))?.Monthly ?? 0;

        var tax = TaxCalculator.Annual(slip.TaxRegime, new TaxInput
        {
            Gross = projectedGross,
            EmployeePf = input.YtdPf + slip.EmployeePf + structurePf * futureMonths,
            ProfessionalTax = Math.Min(2500, input.YtdPt + slip.ProfessionalTax + structurePt * futureMonths),
            BasicAnnual = basicEarned + basicLine * (12 - 1),
            HraAnnual = hraEarned + hraLine * (12 - 1),
            Metro = IsMetro(input.WorkLocation),
            Declarations = input.Declarations(),
        });
        slip.ProjectedTaxable = tax.TaxableIncome;
        slip.AnnualTax = tax.Tax;
        if (settings.TdsEnabled)
            slip.Tds = Math.Max(0, Rupees((tax.Tax - input.YtdTds) / monthsLeft));

        if (slip.EmployeePf > 0) slip.Lines.Add(new PayslipLineDto("PF", "Provident fund", "Deduction", slip.EmployeePf));
        if (slip.EmployeeEsi > 0) slip.Lines.Add(new PayslipLineDto("ESI", "ESI", "Deduction", slip.EmployeeEsi));
        if (slip.ProfessionalTax > 0) slip.Lines.Add(new PayslipLineDto("PT", "Professional tax", "Deduction", slip.ProfessionalTax));
        if (slip.Tds > 0) slip.Lines.Add(new PayslipLineDto("TDS", "Income tax (TDS)", "Deduction", slip.Tds));
        foreach (var a in adjustments.Where(a => a.Kind == "Deduction"))
            slip.Lines.Add(new PayslipLineDto($"ADJ{a.Id}", a.Label, "Deduction", Rupees(a.Amount)));

        slip.TotalDeductions = slip.Lines.Where(l => l.Kind == "Deduction").Sum(l => l.Amount);

        foreach (var r in input.Reimbursements())
        {
            slip.Lines.Add(new PayslipLineDto($"RMB{r.Id}", $"{r.Category} reimbursement", "Reimbursement", Rupees(r.Amount)));
            slip.ReimbursementIds.Add(r.Id);
        }
        slip.Reimbursements = slip.Lines.Where(l => l.Kind == "Reimbursement").Sum(l => l.Amount);

        slip.NetPay = slip.Gross - slip.TotalDeductions + slip.Reimbursements;
        if (slip.NetPay < 0)
        {
            warnings.Add("Deductions are higher than the pay for this month.");
            slip.NetPay = 0;
        }
        if (input.LopOverride is not null) warnings.Add($"Loss-of-pay set by HR{(string.IsNullOrWhiteSpace(input.LopReason) ? "" : ": " + input.LopReason)}.");
        if (string.IsNullOrWhiteSpace(input.BankAccount)) warnings.Add("No bank account on file.");
        if (string.IsNullOrWhiteSpace(input.Pan) && slip.Tds > 0) warnings.Add("No PAN on file: TDS may need to be 20%.");

        slip.Warnings = warnings.Count == 0 ? null : string.Join(" ", warnings);
        if (slip.Warnings is { Length: > 500 }) slip.Warnings = slip.Warnings[..500];
        return slip;
    }

    // ---- Building blocks ------------------------------------------------------------------------

    public static decimal Pf(decimal basic, PayrollSettingsDto s)
    {
        var wage = s.PfCapAtCeiling ? Math.Min(basic, s.PfWageCeiling) : basic;
        return Rupees(wage * s.PfRate / 100m);
    }

    public static decimal Esi(decimal gross, decimal rate) => Math.Ceiling(gross * rate / 100m);

    public static decimal ProfessionalTax(decimal monthlyGross, string state, IReadOnlyList<PtSlabDto> slabs)
    {
        var slab = slabs
            .Where(s => s.State.Equals(state, StringComparison.OrdinalIgnoreCase))
            .FirstOrDefault(s => monthlyGross >= s.FromAmount && (s.ToAmount is null || monthlyGross <= s.ToAmount));
        return slab?.Amount ?? 0;
    }

    public static bool IsMetro(string? city) =>
        !string.IsNullOrWhiteSpace(city) && PayrollRules.MetroCities.Any(m => city.Contains(m, StringComparison.OrdinalIgnoreCase));

    public static decimal Rupees(decimal value) => Math.Round(value, 0, MidpointRounding.AwayFromZero);
}

public sealed class TaxInput
{
    /// <summary>Taxable salary for the whole year.</summary>
    public decimal Gross { get; init; }

    public decimal EmployeePf { get; init; }
    public decimal ProfessionalTax { get; init; }
    public decimal BasicAnnual { get; init; }
    public decimal HraAnnual { get; init; }
    public bool Metro { get; init; }
    public IReadOnlyList<DeclarationAmount> Declarations { get; init; } = [];
}

public sealed record TaxResult(decimal Deductions, decimal TaxableIncome, decimal Tax);

/// <summary>Income tax for salaried individuals, FY 2025-26 onwards (Finance Act 2025). Includes the 87A rebate and 4% cess.</summary>
public static class TaxCalculator
{
    public const decimal StandardDeductionNew = 75000;
    public const decimal StandardDeductionOld = 50000;
    public const decimal RebateLimitNew = 1_200_000;
    public const decimal RebateLimitOld = 500_000;
    public const decimal Cess = 0.04m;

    private static readonly (decimal Upto, decimal Rate)[] NewSlabs =
    [
        (400_000, 0), (800_000, 0.05m), (1_200_000, 0.10m), (1_600_000, 0.15m), (2_000_000, 0.20m), (2_400_000, 0.25m), (decimal.MaxValue, 0.30m),
    ];

    private static readonly (decimal Upto, decimal Rate)[] OldSlabs =
    [
        (250_000, 0), (500_000, 0.05m), (1_000_000, 0.20m), (decimal.MaxValue, 0.30m),
    ];

    public static TaxResult Annual(string regime, TaxInput input) =>
        regime == "Old" ? Old(input) : New(input);

    public static TaxResult New(TaxInput input)
    {
        var deductions = Math.Min(input.Gross, StandardDeductionNew);
        var taxable = Math.Max(0, input.Gross - deductions);
        var tax = Slabs(taxable, NewSlabs);
        if (taxable <= RebateLimitNew) tax = 0;
        else tax = Math.Min(tax, taxable - RebateLimitNew); // marginal relief just above the rebate limit
        return new TaxResult(deductions, taxable, WithCess(tax));
    }

    public static TaxResult Old(TaxInput input)
    {
        decimal Declared(string section) => input.Declarations.Where(d => d.Section.Equals(section, StringComparison.OrdinalIgnoreCase)).Sum(d => d.Amount);
        decimal Cap(string section, decimal amount) =>
            PayrollRules.Sections.TryGetValue(section, out var cap) && cap is { } c ? Math.Min(amount, c) : amount;

        var rent = Declared("HRA");
        var hraExempt = rent <= 0 ? 0 : Math.Max(0, Math.Min(input.HraAnnual,
            Math.Min(rent - input.BasicAnnual * 0.10m, input.BasicAnnual * (input.Metro ? 0.50m : 0.40m))));

        var deductions =
            StandardDeductionOld
            + input.ProfessionalTax
            + hraExempt
            + Cap("80C", Declared("80C") + input.EmployeePf)
            + Cap("80D", Declared("80D"))
            + Cap("80CCD1B", Declared("80CCD1B"))
            + Cap("24B", Declared("24B"))
            + Declared("80E")
            + Declared("80G");
        deductions = Math.Min(input.Gross, PayrollCalculator.Rupees(deductions));

        var taxable = Math.Max(0, input.Gross - deductions);
        var tax = Slabs(taxable, OldSlabs);
        if (taxable <= RebateLimitOld) tax = 0;
        return new TaxResult(deductions, taxable, WithCess(tax));
    }

    private static decimal Slabs(decimal income, (decimal Upto, decimal Rate)[] slabs)
    {
        decimal tax = 0, lower = 0;
        foreach (var (upto, rate) in slabs)
        {
            if (income <= lower) break;
            tax += (Math.Min(income, upto) - lower) * rate;
            lower = upto;
        }
        return tax;
    }

    private static decimal WithCess(decimal tax) => PayrollCalculator.Rupees(tax * (1 + Cess));
}

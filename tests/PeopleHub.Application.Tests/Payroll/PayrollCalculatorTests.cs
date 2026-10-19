using PeopleHub.Application.Modules.Payroll.Calculation;
using PeopleHub.Application.Modules.Payroll.Contracts;

namespace PeopleHub.Application.Tests.Payroll;

public sealed class PayrollCalculatorTests
{
    internal static readonly PayrollSettingsDto Settings = new();

    internal static readonly List<PayComponentDto> Components =
    [
        new() { Code = "BASIC", Name = "Basic salary", CalcType = "PctCtc", Value = 40, SortOrder = 10 },
        new() { Code = "HRA", Name = "House rent allowance", CalcType = "PctBasic", Value = 40, SortOrder = 20 },
        new() { Code = "CONV", Name = "Conveyance allowance", CalcType = "Fixed", Value = 1600, SortOrder = 30 },
        new() { Code = "MEDICAL", Name = "Medical allowance", CalcType = "Fixed", Value = 1250, SortOrder = 40 },
        new() { Code = "SPECIAL", Name = "Special allowance", CalcType = "Balance", SortOrder = 50 },
    ];

    internal static readonly List<PtSlabDto> Slabs =
    [
        new() { State = "Telangana", FromAmount = 0, ToAmount = 15000, Amount = 0 },
        new() { State = "Telangana", FromAmount = 15000.01m, ToAmount = 20000, Amount = 150 },
        new() { State = "Telangana", FromAmount = 20000.01m, ToAmount = null, Amount = 200 },
    ];

    private static RunInputRow Input(decimal ctc, int days = 31) => new()
    {
        EmployeeId = "EMP00001",
        EmployeeName = "Venkat Jangili",
        AnnualCtc = ctc,
        PfApplicable = true,
        DaysInMonth = days,
        TaxRegime = "New",
        BankAccount = "50100123450001",
        Pan = "ABCDE1231F",
    };

    [Fact]
    public void Structure_adds_back_up_to_the_ctc()
    {
        var s = PayrollCalculator.Structure(900000, true, Components, Settings, Slabs);

        Assert.Equal(75000, s.MonthlyCtc);
        Assert.Equal(30000, s.Lines.Single(l => l.Code == "BASIC").Monthly);
        Assert.Equal(12000, s.Lines.Single(l => l.Code == "HRA").Monthly);
        Assert.Equal(1800, s.Lines.Single(l => l.Code == "PF_ER").Monthly); // 12% of the 15,000 ceiling
        Assert.False(s.EsiApplicable);
        Assert.Equal(s.MonthlyCtc, s.MonthlyGross + s.Lines.Where(l => l.Kind == "Employer").Sum(l => l.Monthly));
        Assert.Equal(200, s.Lines.Single(l => l.Code == "PT").Monthly);
        Assert.Empty(s.Warnings);
    }

    [Fact]
    public void Low_salary_gets_esi_and_it_stays_inside_the_ctc()
    {
        var s = PayrollCalculator.Structure(264000, true, Components, Settings, Slabs);

        Assert.True(s.EsiApplicable);
        Assert.True(s.MonthlyGross <= Settings.EsiWageLimit);
        var employer = s.Lines.Where(l => l.Kind == "Employer").Sum(l => l.Monthly);
        Assert.InRange(s.MonthlyGross + employer, s.MonthlyCtc - 1, s.MonthlyCtc + 1);
        Assert.Contains(s.Lines, l => l.Code == "ESI" && l.Kind == "Deduction");
    }

    [Fact]
    public void Fixed_components_larger_than_ctc_are_flagged()
    {
        var s = PayrollCalculator.Structure(30000, true, Components, Settings, Slabs);
        Assert.NotEmpty(s.Warnings);
        Assert.Equal(0, s.Lines.Single(l => l.Code == "SPECIAL").Monthly);
    }

    [Fact]
    public void Full_month_payslip_balances()
    {
        var slip = PayrollCalculator.Payslip(Input(900000), 10, Components, Settings, Slabs);

        Assert.Equal(31, slip.PaidDays);
        Assert.Equal(1800, slip.EmployeePf);
        Assert.Equal(200, slip.ProfessionalTax);
        Assert.Equal(slip.Gross - slip.TotalDeductions + slip.Reimbursements, slip.NetPay);
        Assert.Equal(slip.Lines.Where(l => l.Kind == "Earning").Sum(l => l.Amount), slip.Gross);
    }

    [Fact]
    public void Loss_of_pay_reduces_prorated_earnings()
    {
        var full = PayrollCalculator.Payslip(Input(900000, 30), 10, Components, Settings, Slabs);
        var input = Input(900000, 30);
        input.UnpaidLeaveDays = 3;
        var lop = PayrollCalculator.Payslip(input, 10, Components, Settings, Slabs);

        Assert.Equal(27, lop.PaidDays);
        Assert.Equal(27000, lop.Lines.Single(l => l.Code == "BASIC").Amount);
        Assert.True(lop.Gross < full.Gross);
    }

    [Fact]
    public void Hr_override_beats_calculated_lop_and_is_clamped()
    {
        var input = Input(900000, 30);
        input.AbsentDays = 5;
        input.LopOverride = 45;
        var slip = PayrollCalculator.Payslip(input, 10, Components, Settings, Slabs);

        Assert.Equal(30, slip.LopDays);
        Assert.Equal(0, slip.Gross);
        Assert.Equal(0, slip.NetPay);
    }

    [Fact]
    public void Adjustments_and_reimbursements_show_on_the_payslip()
    {
        var input = Input(900000);
        input.AdjustmentsJson = """[{"Id":1,"kind":"Earning","label":"Festival bonus","amount":10000,"isTaxable":true},{"Id":2,"kind":"Deduction","label":"Advance recovery","amount":2000,"isTaxable":false}]""";
        input.ReimbursementsJson = """[{"id":7,"category":"Travel","amount":2450}]""";
        var slip = PayrollCalculator.Payslip(input, 10, Components, Settings, Slabs);

        Assert.Contains(slip.Lines, l => l.Name == "Festival bonus" && l.Kind == "Earning" && l.Amount == 10000);
        Assert.Contains(slip.Lines, l => l.Name == "Advance recovery" && l.Kind == "Deduction");
        Assert.Equal(2450, slip.Reimbursements);
        Assert.Equal(new List<int> { 7 }, slip.ReimbursementIds);
    }

    [Theory]
    [InlineData(1_275_000, 0)]        // 12.75 L gross -> 12 L taxable -> rebate
    [InlineData(1_675_000, 124_800)]  // 16 L taxable: 20k + 40k + 60k = 1.2 L + 4% cess
    public void New_regime_tax(decimal gross, decimal expected)
    {
        var t = TaxCalculator.New(new TaxInput { Gross = gross });
        Assert.Equal(expected, t.Tax);
    }

    [Fact]
    public void New_regime_marginal_relief_just_above_rebate()
    {
        var t = TaxCalculator.New(new TaxInput { Gross = 1_285_000 }); // 12.10 L taxable
        Assert.Equal(10_400, t.Tax); // relief caps tax at income above 12 L (10,000) + cess
    }

    [Fact]
    public void Old_regime_uses_declarations_with_caps()
    {
        var t = TaxCalculator.Old(new TaxInput
        {
            Gross = 1_200_000,
            EmployeePf = 21_600,
            ProfessionalTax = 2_400,
            BasicAnnual = 480_000,
            HraAnnual = 192_000,
            Declarations = [new("80C", 200_000), new("80D", 25_000), new("HRA", 300_000)],
        });

        // Std 50k + PT 2.4k + 80C capped 1.5L + 80D 25k + HRA min(192k, 300k - 48k, 192k) = 192k
        Assert.Equal(419_400, t.Deductions);
        Assert.Equal(780_600, t.TaxableIncome);
    }
}

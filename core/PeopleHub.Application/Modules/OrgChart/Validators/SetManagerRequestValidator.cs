using FluentValidation;
using PeopleHub.Application.Modules.OrgChart.Contracts;

namespace PeopleHub.Application.Modules.OrgChart.Validators;

/// <summary>Shape only. Self-reporting, unknown managers and loops are rejected by sp_org_set_manager.</summary>
public sealed class SetManagerRequestValidator : AbstractValidator<SetManagerRequest>
{
    public SetManagerRequestValidator()
    {
        RuleFor(x => x.ManagerId)
            .MaximumLength(OrgChartRules.CodeMax)
            .WithMessage($"Manager id must be {OrgChartRules.CodeMax} characters or fewer.");
    }
}

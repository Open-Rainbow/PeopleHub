using FluentValidation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class SeparationRequestValidator : AbstractValidator<SeparationRequest>
{
    public SeparationRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.SeparationType).NotEmpty().MaximumLength(50);
        RuleFor(x => x.SeparationStatus).NotEmpty().MaximumLength(50);
        RuleFor(x => x.ExitReason).NotEmpty().MaximumLength(100);
        RuleFor(x => x.InitiationDate).NotNull();
        RuleFor(x => x.FinalLastWorkingDay).NotNull();
        RuleFor(x => x.AttritionCategory).MaximumLength(50);
        RuleFor(x => x.ManagerClearanceStatus).MaximumLength(50);
        RuleFor(x => x.HrClearanceStatus).MaximumLength(50);
        RuleFor(x => x.ExitInterviewStatus).MaximumLength(50);
        RuleFor(x => x.KnowledgeTransferStatus).MaximumLength(50);
        RuleFor(x => x.LeaveBalanceAtExit).Must(v => v is null or >= 0).WithMessage("'{PropertyName}' cannot be negative.");
        RuleFor(x => x.FinalSettlementStatus).MaximumLength(50);
        RuleFor(x => x.ApplicationAccessRevokeStatus).MaximumLength(50);
        RuleFor(x => x.DetailedExitRemarks).MaximumLength(1000);
        RuleFor(x => x.NoticeEndDate)
            .Must((x, v) => v >= x.NoticeStartDate)
            .When(x => x.NoticeStartDate.HasValue && x.NoticeEndDate.HasValue)
            .WithMessage("Notice end date must be on or after notice start date.");
        RuleFor(x => x.FinalLastWorkingDay)
            .Must((x, v) => v >= x.InitiationDate)
            .When(x => x.InitiationDate.HasValue && x.FinalLastWorkingDay.HasValue)
            .WithMessage("Final last working day must be on or after initiation date.");
        RuleFor(x => x.ProposedLastWorkingDay)
            .Must((x, v) => v >= x.ResignationDate)
            .When(x => x.ResignationDate.HasValue && x.ProposedLastWorkingDay.HasValue)
            .WithMessage("Proposed last working day must be on or after resignation date.");
    }
}

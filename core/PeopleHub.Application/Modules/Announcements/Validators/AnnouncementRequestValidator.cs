using FluentValidation;
using PeopleHub.Application.Modules.Announcements.Contracts;

namespace PeopleHub.Application.Modules.Announcements.Validators;

public sealed class AnnouncementRequestValidator : AbstractValidator<AnnouncementRequest>
{
    public AnnouncementRequestValidator()
    {
        RuleFor(x => x.Title)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Title is required.")
            .Must(v => v!.Trim().Length <= AnnouncementRules.TitleMax)
            .WithMessage($"Title must be {AnnouncementRules.TitleMax} characters or fewer.");

        RuleFor(x => x.Description)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Description is required.")
            .Must(v => v!.Trim().Length <= AnnouncementRules.DescriptionMax)
            .WithMessage($"Description must be {AnnouncementRules.DescriptionMax} characters or fewer.");

        RuleFor(x => x.Priority)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Priority is required.")
            .Must(v => AnnouncementRules.Priorities.Contains(v!.Trim(), StringComparer.OrdinalIgnoreCase))
            .WithMessage("Priority must be High, Medium or Low.");

        RuleFor(x => x.Category)
            .NotEmpty().WithMessage("Category is required.")
            .MaximumLength(AnnouncementRules.CategoryMax);

        RuleFor(x => x.Department)
            .NotEmpty().WithMessage("Department is required.")
            .MaximumLength(AnnouncementRules.DepartmentMax);

        RuleFor(x => x.TargetAudience)
            .NotEmpty().WithMessage("Target audience is required.")
            .MaximumLength(AnnouncementRules.AudienceMax);

        RuleFor(x => x.PostedBy).MaximumLength(AnnouncementRules.PostedByMax);

        RuleFor(x => x.PublishOn).NotNull().WithMessage("Publish date is required.");

        RuleFor(x => x.ExpiresOn)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Expiry date is required.")
            .Must((x, expires) => x.PublishOn is null || expires!.Value.Date >= x.PublishOn.Value.Date)
            .WithMessage("Expiry date must be on or after the publish date.")
            .Must((x, expires) => x.PublishOn is null || (expires!.Value.Date - x.PublishOn.Value.Date).TotalDays <= 366)
            .WithMessage("An announcement can run for at most one year.");
    }
}

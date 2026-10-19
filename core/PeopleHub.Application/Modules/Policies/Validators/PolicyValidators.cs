using FluentValidation;
using PeopleHub.Application.Modules.Policies.Contracts;

namespace PeopleHub.Application.Modules.Policies.Validators;

/// <summary>Shape checks. Duplicates and "text or file" on updates are checked by the stored procedure.</summary>
public sealed class SavePolicyRequestValidator : AbstractValidator<SavePolicyRequest>
{
    public SavePolicyRequestValidator()
    {
        RuleFor(x => x.Title).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Give the policy a title.")
            .Must(v => v!.Trim().Length >= PolicyRules.TitleMin).WithMessage($"Title must be at least {PolicyRules.TitleMin} characters.")
            .Must(v => v!.Trim().Length <= PolicyRules.TitleMax).WithMessage($"Title must be {PolicyRules.TitleMax} characters or fewer.");

        RuleFor(x => x.Category)
            .Must(v => PolicyRules.Canonical(PolicyRules.Categories, v) is not null)
            .WithMessage("Pick a category.");

        RuleFor(x => x.Summary).MaximumLength(PolicyRules.SummaryMax)
            .WithMessage($"Summary must be {PolicyRules.SummaryMax} characters or fewer.");
        RuleFor(x => x.Content).MaximumLength(PolicyRules.ContentMax)
            .WithMessage($"Policy text must be {PolicyRules.ContentMax:N0} characters or fewer. Attach a file for longer documents.");
        RuleFor(x => x.Audience).MaximumLength(PolicyRules.AudienceMax);

        RuleFor(x => x.File!.FileName).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("The file needs a name.")
            .MaximumLength(PolicyRules.FileNameMax).WithMessage("File name is too long.")
            .Must(n => PolicyRules.FileTypes.ContainsKey(PolicyRules.Extension(n)))
            .WithMessage("Upload a PDF, Word, Excel, PowerPoint, text or image file.")
            .When(x => x.File is not null);

        RuleFor(x => x.File!.Data).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("The file is empty.")
            .Must(d => PolicyRules.DecodedLength(d) <= PolicyRules.MaxFileBytes).WithMessage("Files must be 10 MB or smaller.")
            .Must(d => PolicyRules.Decode(d) is { Length: > 0 }).WithMessage("The file could not be read. Upload it again.")
            .When(x => x.File is not null);
    }
}

public sealed class SetPolicyStatusRequestValidator : AbstractValidator<SetPolicyStatusRequest>
{
    public SetPolicyStatusRequestValidator()
    {
        RuleFor(x => x.Status)
            .Must(v => PolicyRules.Canonical(PolicyRules.Statuses, v) is not null)
            .WithMessage("Status must be Draft, Published or Archived.");
    }
}

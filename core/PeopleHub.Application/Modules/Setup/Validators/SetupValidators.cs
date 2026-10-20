using FluentValidation;
using PeopleHub.Application.Modules.Setup.Contracts;

namespace PeopleHub.Application.Modules.Setup.Validators;

/// <summary>Shape checks. Duplicates, built-in role rules and Super Admin protection are checked by the stored procedures.</summary>
public sealed class SaveRoleRequestValidator : AbstractValidator<SaveRoleRequest>
{
    public SaveRoleRequestValidator()
    {
        RuleFor(x => x.Code).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Give the role a code, e.g. team-lead.")
            .Must(SetupRules.IsCode).WithMessage("Code must start with a letter and use lower case letters, digits or dashes (2-30 characters).");

        RuleFor(x => x.Name).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Give the role a name.")
            .Must(v => v!.Trim().Length >= SetupRules.NameMin).WithMessage($"Name must be at least {SetupRules.NameMin} characters.")
            .Must(v => v!.Trim().Length <= SetupRules.NameMax).WithMessage($"Name must be {SetupRules.NameMax} characters or fewer.");

        RuleFor(x => x.Description).MaximumLength(SetupRules.DescriptionMax)
            .WithMessage($"Description must be {SetupRules.DescriptionMax} characters or fewer.");

        RuleFor(x => x.CopyFromRoleId).GreaterThan(0).When(x => x.CopyFromRoleId is not null)
            .WithMessage("Pick a role to copy from.");
    }
}

public sealed class SavePermissionsRequestValidator : AbstractValidator<SavePermissionsRequest>
{
    public SavePermissionsRequestValidator()
    {
        RuleFor(x => x.Items).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Send the permission grid.")
            .Must(i => i!.Count <= SetupRules.MaxItems).WithMessage("Too many pages.")
            .Must(i => i!.Select(p => p.PageKey?.Trim().ToLowerInvariant()).Distinct().Count() == i!.Count)
            .WithMessage("Each page can appear only once.");

        RuleForEach(x => x.Items).ChildRules(item =>
            item.RuleFor(p => p.PageKey).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Page is missing.")
                .MaximumLength(60).WithMessage("Page key is too long."));
    }
}

public sealed class RegisterFieldsRequestValidator : AbstractValidator<RegisterFieldsRequest>
{
    public RegisterFieldsRequestValidator()
    {
        RuleFor(x => x.FormKey).Must(SetupRules.IsFormKey).WithMessage("Form key is not valid.");
        RuleFor(x => x.Fields).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Send the fields of the form.")
            .Must(f => f!.Count <= SetupRules.MaxItems).WithMessage("Too many fields.");
        RuleForEach(x => x.Fields).ChildRules(f =>
        {
            f.RuleFor(i => i.FieldKey).Must(SetupRules.IsFieldKey).WithMessage("Field key is not valid.");
            f.RuleFor(i => i.Label).Cascade(CascadeMode.Stop).NotEmpty().MaximumLength(200);
        });
    }
}

public sealed class SaveFieldSettingsRequestValidator : AbstractValidator<SaveFieldSettingsRequest>
{
    public SaveFieldSettingsRequestValidator()
    {
        RuleFor(x => x.FormKey).Must(SetupRules.IsFormKey).WithMessage("Pick a form.");
        RuleFor(x => x.Items).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Send the field settings.")
            .Must(i => i!.Count <= SetupRules.MaxItems).WithMessage("Too many fields.");
        RuleForEach(x => x.Items).ChildRules(i =>
        {
            i.RuleFor(s => s.FieldKey).Must(SetupRules.IsFieldKey).WithMessage("Field key is not valid.");
            i.RuleFor(s => s.Requirement)
                .Must(r => string.IsNullOrWhiteSpace(r) || SetupRules.Canonical(SetupRules.Requirements, r) is not null)
                .WithMessage("Requirement must be Default, Required or Optional.");
        });
    }
}

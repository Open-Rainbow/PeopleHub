using System.Text.RegularExpressions;
using FluentValidation;
using PeopleHub.Application.Common.Utilities;

namespace PeopleHub.Application.Common.Validation;

/// <summary>
/// Reusable format rules. Every rule here ignores empty values,
/// so add NotEmpty() in front when the field is required.
/// </summary>
public static partial class RuleExtensions
{
    public const int MaxFileBytes = 5 * 1024 * 1024;

    public static IRuleBuilderOptions<T, string?> ValidEmail<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || EmailRegex().IsMatch(v!.Trim()))
            .WithMessage("'{PropertyName}' must be a valid email address.");

    public static IRuleBuilderOptions<T, string?> ValidMobile<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || (PhoneRegex().IsMatch(v!.Trim()) && Digits(v) is >= 10 and <= 15))
            .WithMessage("'{PropertyName}' must be a valid mobile number (10-15 digits).");

    public static IRuleBuilderOptions<T, string?> ValidLandline<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || (PhoneRegex().IsMatch(v!.Trim()) && Digits(v) is >= 6 and <= 15))
            .WithMessage("'{PropertyName}' must be a valid phone number.");

    public static IRuleBuilderOptions<T, string?> ValidPan<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || PanRegex().IsMatch(v!.Trim()))
            .WithMessage("'{PropertyName}' must be a valid PAN (e.g. ABCDE1234F).");

    public static IRuleBuilderOptions<T, string?> ValidAadhaar<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || AadhaarRegex().IsMatch(v!.Replace(" ", string.Empty)))
            .WithMessage("'{PropertyName}' must be a valid 12-digit Aadhaar number.");

    public static IRuleBuilderOptions<T, string?> ValidIfsc<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || IfscRegex().IsMatch(v!.Trim()))
            .WithMessage("'{PropertyName}' must be a valid IFSC code (e.g. HDFC0001234).");

    public static IRuleBuilderOptions<T, string?> ValidBankAccount<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || BankAccountRegex().IsMatch(v!.Trim()))
            .WithMessage("'{PropertyName}' must be 9-18 digits.");

    public static IRuleBuilderOptions<T, string?> ValidUan<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || UanRegex().IsMatch(v!.Trim()))
            .WithMessage("'{PropertyName}' must be a 12-digit UAN.");

    public static IRuleBuilderOptions<T, string?> ValidMicr<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || MicrRegex().IsMatch(v!.Trim()))
            .WithMessage("'{PropertyName}' must be a 9-digit MICR code.");

    public static IRuleBuilderOptions<T, string?> ValidPincode<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || PincodeRegex().IsMatch(v!.Trim()))
            .WithMessage("'{PropertyName}' must be a valid postal code.");

    public static IRuleBuilderOptions<T, string?> ValidUrl<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v)
                || (Uri.TryCreate(v!.Trim(), UriKind.Absolute, out var uri)
                    && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps)))
            .WithMessage("'{PropertyName}' must be a valid http(s) link.");

    /// <summary>Base64 / data-URI file, max 5 MB.</summary>
    public static IRuleBuilderOptions<T, string?> ValidFile<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v) || Base64Payload.TryDecode(v) is { Length: > 0 and <= MaxFileBytes })
            .WithMessage("'{PropertyName}' must be a valid file up to 5 MB.");

    /// <summary>8+ chars with upper, lower, digit and special character.</summary>
    public static IRuleBuilderOptions<T, string?> StrongPassword<T>(this IRuleBuilder<T, string?> rule) =>
        rule.Must(v => IsEmpty(v)
                || (v!.Length >= 8
                    && v.Any(char.IsUpper)
                    && v.Any(char.IsLower)
                    && v.Any(char.IsDigit)
                    && v.Any(c => !char.IsLetterOrDigit(c))))
            .WithMessage("Password must be at least 8 characters with upper, lower, number and special character.");

    private static bool IsEmpty(string? value) => string.IsNullOrWhiteSpace(value);

    private static int Digits(string? value) => value?.Count(char.IsDigit) ?? 0;

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")]
    private static partial Regex EmailRegex();

    [GeneratedRegex(@"^\+?[0-9][0-9 \-]{4,19}$")]
    private static partial Regex PhoneRegex();

    [GeneratedRegex(@"^[A-Z]{5}[0-9]{4}[A-Z]$", RegexOptions.IgnoreCase)]
    private static partial Regex PanRegex();

    [GeneratedRegex(@"^[2-9][0-9]{11}$")]
    private static partial Regex AadhaarRegex();

    [GeneratedRegex(@"^[A-Z]{4}0[A-Z0-9]{6}$", RegexOptions.IgnoreCase)]
    private static partial Regex IfscRegex();

    [GeneratedRegex(@"^[0-9]{9,18}$")]
    private static partial Regex BankAccountRegex();

    [GeneratedRegex(@"^[0-9]{12}$")]
    private static partial Regex UanRegex();

    [GeneratedRegex(@"^[0-9]{9}$")]
    private static partial Regex MicrRegex();

    [GeneratedRegex(@"^[A-Za-z0-9][A-Za-z0-9 \-]{2,9}$")]
    private static partial Regex PincodeRegex();
}

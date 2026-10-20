namespace PeopleHub.Application.Modules.Setup.Contracts;

/// <summary>A role of the organization (built-in or custom).</summary>
public sealed class RoleDto
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    /// <summary>Built-in role (Super Admin, Admin, HR, Manager, Employee): code is fixed, cannot be deleted or deactivated.</summary>
    public bool IsSystem { get; set; }

    public bool IsActive { get; set; }
    public int SortOrder { get; set; }

    /// <summary>Pages this role can open.</summary>
    public int PageCount { get; set; }

    /// <summary>Fields with a hidden / read-only / required rule for this role.</summary>
    public int FieldRuleCount { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }

    /// <summary>Super Admin always has full access; the UI shows it read-only.</summary>
    public bool IsLocked => Code == SetupRules.SuperAdmin;
}

/// <summary>POST api/v1/setup/roles | PUT api/v1/setup/roles/{id}</summary>
public sealed record SaveRoleRequest
{
    /// <summary>Short key, e.g. "team-lead" (lower case, letters, digits, dashes).</summary>
    public string? Code { get; init; }

    public string? Name { get; init; }
    public string? Description { get; init; }

    /// <summary>New roles only: start with this role's page access and field rules.</summary>
    public int? CopyFromRoleId { get; init; }
}

/// <summary>POST api/v1/setup/roles/{id}/status</summary>
public sealed record SetRoleStatusRequest
{
    public bool IsActive { get; init; }
}

/// <summary>A page with what one role may do on it.</summary>
public sealed class PagePermissionDto
{
    public string PageKey { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ModuleName { get; set; } = string.Empty;

    /// <summary>Comma separated actions the page supports, e.g. "view,create,edit,delete".</summary>
    public string Actions { get; set; } = "view";

    public int SortOrder { get; set; }
    public bool CanView { get; set; }
    public bool CanCreate { get; set; }
    public bool CanEdit { get; set; }
    public bool CanDelete { get; set; }
    public bool CanApprove { get; set; }
    public bool CanExport { get; set; }

    public IReadOnlyList<string> SupportedActions => Actions.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}

public sealed record PermissionItem
{
    public string? PageKey { get; init; }
    public bool CanView { get; init; }
    public bool CanCreate { get; init; }
    public bool CanEdit { get; init; }
    public bool CanDelete { get; init; }
    public bool CanApprove { get; init; }
    public bool CanExport { get; init; }
}

/// <summary>PUT api/v1/setup/roles/{id}/permissions  The whole grid of the role (pages left out = no access).</summary>
public sealed record SavePermissionsRequest
{
    public IReadOnlyList<PermissionItem>? Items { get; init; }
}

/// <summary>Effective access on one page.</summary>
public sealed class AccessPermissionDto
{
    public string PageKey { get; set; } = string.Empty;
    public bool CanView { get; set; }
    public bool CanCreate { get; set; }
    public bool CanEdit { get; set; }
    public bool CanDelete { get; set; }
    public bool CanApprove { get; set; }
    public bool CanExport { get; set; }

    public bool Allows(string action) => action switch
    {
        "view" => CanView,
        "create" => CanCreate,
        "edit" => CanEdit,
        "delete" => CanDelete,
        "approve" => CanApprove,
        "export" => CanExport,
        _ => false,
    };
}

/// <summary>A non-default field rule: hidden, read-only, or required / optional.</summary>
public sealed class FieldRuleDto
{
    public string FormKey { get; set; } = string.Empty;
    public string FieldKey { get; set; } = string.Empty;
    public bool IsHidden { get; set; }
    public bool IsReadOnly { get; set; }

    /// <summary>Default | Required | Optional</summary>
    public string Requirement { get; set; } = "Default";
}

/// <summary>GET api/v1/setup/my-access  Everything the app needs after login.</summary>
public sealed class MyAccessDto
{
    public string Role { get; set; } = string.Empty;
    public bool IsSuperAdmin { get; set; }
    public IReadOnlyList<AccessPermissionDto> Pages { get; set; } = [];
    public IReadOnlyList<FieldRuleDto> Fields { get; set; } = [];
}

/// <summary>A form the app has reported (form key = page path after the role, e.g. "add-employee/personal-info").</summary>
public sealed class FormDto
{
    public string FormKey { get; set; } = string.Empty;
    public int FieldCount { get; set; }
    public DateTime LastSeenAt { get; set; }
}

/// <summary>A field of a form with one role's rule.</summary>
public sealed class FieldSettingDto
{
    public string FormKey { get; set; } = string.Empty;
    public string FieldKey { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsHidden { get; set; }
    public bool IsReadOnly { get; set; }
    public string Requirement { get; set; } = "Default";
}

public sealed record FieldItem
{
    public string? FieldKey { get; init; }
    public string? Label { get; init; }
    public int SortOrder { get; init; }
}

/// <summary>POST api/v1/setup/fields/register  Sent by the app when a form renders.</summary>
public sealed record RegisterFieldsRequest
{
    public string? FormKey { get; init; }
    public IReadOnlyList<FieldItem>? Fields { get; init; }
}

public sealed record FieldSettingItem
{
    public string? FieldKey { get; init; }
    public bool IsHidden { get; init; }
    public bool IsReadOnly { get; init; }

    /// <summary>Default | Required | Optional</summary>
    public string? Requirement { get; init; }
}

/// <summary>PUT api/v1/setup/roles/{id}/fields  All rules of one role for one form.</summary>
public sealed record SaveFieldSettingsRequest
{
    public string? FormKey { get; init; }
    public IReadOnlyList<FieldSettingItem>? Items { get; init; }
}

public static class SetupRules
{
    public const string SuperAdmin = "superadmin";
    public const string Admin = "admin";

    public static readonly string[] Actions = ["view", "create", "edit", "delete", "approve", "export"];
    public static readonly string[] Requirements = ["Default", "Required", "Optional"];

    public const int CodeMax = 30;
    public const int NameMin = 2;
    public const int NameMax = 60;
    public const int DescriptionMax = 200;
    public const int FormKeyMax = 100;
    public const int FieldKeyMax = 80;
    public const int LabelMax = 120;
    public const int MaxItems = 500;

    public static bool IsCode(string? value) =>
        !string.IsNullOrWhiteSpace(value) && System.Text.RegularExpressions.Regex.IsMatch(value.Trim(), "^[a-z][a-z0-9-]{1,29}$");

    public static bool IsFormKey(string? value) =>
        !string.IsNullOrWhiteSpace(value) && value.Trim().Length <= FormKeyMax
        && System.Text.RegularExpressions.Regex.IsMatch(value.Trim(), "^[a-z0-9][a-z0-9/_.-]*$", System.Text.RegularExpressions.RegexOptions.IgnoreCase);

    public static bool IsFieldKey(string? value) =>
        !string.IsNullOrWhiteSpace(value) && value.Trim().Length <= FieldKeyMax
        && System.Text.RegularExpressions.Regex.IsMatch(value.Trim(), "^[A-Za-z0-9_.-]+$");

    public static string? Canonical(IEnumerable<string> allowed, string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : allowed.FirstOrDefault(a => a.Equals(value.Trim(), StringComparison.OrdinalIgnoreCase));
}

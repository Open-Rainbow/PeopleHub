namespace PeopleHub.Server.Common;

/// <summary>Single place for URL prefixes. Bump the version here, not in controllers.</summary>
public static class ApiRoutes
{
    public const string Base = "api/v1";

    public static class Employees
    {
        public const string Root = Base + "/employees";
    }
}

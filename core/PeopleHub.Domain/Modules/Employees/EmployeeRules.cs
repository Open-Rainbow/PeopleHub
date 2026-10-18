namespace PeopleHub.Domain.Modules.Employees;

/// <summary>Pure business rules for employees. No infrastructure, no framework.</summary>
public static class EmployeeRules
{
    public const int MinimumAgeYears = 18;
    public const int MaximumAgeYears = 100;

    public static int AgeOn(DateOnly dateOfBirth, DateOnly onDate)
    {
        var age = onDate.Year - dateOfBirth.Year;
        if (onDate < dateOfBirth.AddYears(age))
        {
            age--;
        }

        return age;
    }

    public static bool IsOfWorkingAge(DateOnly dateOfBirth, DateOnly onDate)
    {
        var age = AgeOn(dateOfBirth, onDate);
        return age is >= MinimumAgeYears and <= MaximumAgeYears;
    }
}

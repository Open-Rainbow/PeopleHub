namespace PeopleHub.Application.Common.Models;

/// <summary>Standard input for every list endpoint.</summary>
public record PagedRequest
{
    public const int MaxPageSize = 200;

    public int Page { get; init; } = 1;

    public int PageSize { get; init; } = 20;

    public string? Search { get; init; }

    public string? SortBy { get; init; }

    public bool Descending { get; init; }

    public int SafePage => Math.Max(Page, 1);

    public int SafePageSize => Math.Clamp(PageSize, 1, MaxPageSize);

    public int Skip => (SafePage - 1) * SafePageSize;
}

/// <summary>Standard output for every list endpoint.</summary>
public sealed record PagedResult<T>(IReadOnlyList<T> Items, int Page, int PageSize, int TotalCount)
{
    public int TotalPages => PageSize <= 0 ? 0 : (int)Math.Ceiling(TotalCount / (double)PageSize);
}

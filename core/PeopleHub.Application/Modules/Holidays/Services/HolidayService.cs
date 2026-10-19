using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Holidays.Contracts;
using PeopleHub.Application.Modules.Holidays.Interfaces;

namespace PeopleHub.Application.Modules.Holidays.Services;

public sealed class HolidayService(
    IHolidayRepository repository,
    IValidator<SaveHolidayRequest> validator,
    IRequestContext context) : IHolidayService
{
    private const string Resource = "Holiday";

    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? "anonymous" : context.UserId!;

    public async Task<IReadOnlyList<HolidayItemDto>> GetAsync(int? year, CancellationToken ct)
    {
        var value = year ?? DateTime.Today.Year;
        if (value is < HolidayRules.YearMin or > HolidayRules.YearMax)
            throw new RequestValidationException(new Dictionary<string, string[]>
            {
                ["year"] = [$"Year must be between {HolidayRules.YearMin} and {HolidayRules.YearMax}."],
            });
        return await repository.GetAsync(OrgId, value, ct);
    }

    public async Task<HolidayItemDto> GetByIdAsync(int id, CancellationToken ct) =>
        await repository.GetByIdAsync(OrgId, id, ct) ?? throw new NotFoundException(Resource, id);

    public Task<HolidayItemDto> CreateAsync(SaveHolidayRequest request, CancellationToken ct) => Save(null, request, ct);

    public Task<HolidayItemDto> UpdateAsync(int id, SaveHolidayRequest request, CancellationToken ct) => Save(id, request, ct);

    public async Task DeleteAsync(int id, CancellationToken ct)
    {
        if (!await repository.DeleteAsync(OrgId, UserId, id, ct)) throw new NotFoundException(Resource, id);
    }

    private async Task<HolidayItemDto> Save(int? id, SaveHolidayRequest request, CancellationToken ct)
    {
        await validator.EnsureValidAsync(request, ct);
        var normalized = request with
        {
            Date = request.Date!.Value.Date,
            Name = request.Name!.Trim(),
            Type = HolidayRules.Canonical(request.Type),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
        };

        var result = await repository.SaveAsync(OrgId, UserId, id, normalized, ct);
        if (result.Affected == 0 || result.Id is null) throw new NotFoundException(Resource, id ?? 0);
        return await GetByIdAsync(result.Id.Value, ct);
    }
}

using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.OrgChart.Contracts;
using PeopleHub.Application.Modules.OrgChart.Interfaces;

namespace PeopleHub.Application.Modules.OrgChart.Services;

public sealed class OrgChartService(
    IOrgChartRepository repository,
    IValidator<SetManagerRequest> validator,
    IRequestContext context) : IOrgChartService
{
    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? "anonymous" : context.UserId!;

    public async Task<IReadOnlyList<OrgChartNodeDto>> GetAsync(CancellationToken ct) =>
        await repository.GetAsync(OrgId, ct);

    public async Task<IReadOnlyList<OrgChartNodeDto>> SetManagerAsync(string employeeId, SetManagerRequest request, CancellationToken ct)
    {
        await validator.EnsureValidAsync(request, ct);
        if (string.IsNullOrWhiteSpace(employeeId) || employeeId.Trim().Length > OrgChartRules.CodeMax)
            throw new RequestValidationException(new Dictionary<string, string[]>
            {
                ["employeeId"] = ["Employee id is required."],
            });

        var employee = employeeId.Trim();
        var manager = string.IsNullOrWhiteSpace(request.ManagerId) ? null : request.ManagerId.Trim();
        if (string.Equals(employee, manager, StringComparison.OrdinalIgnoreCase))
            throw new BusinessRuleException("Someone cannot report to themselves.");

        if (!await repository.SetManagerAsync(OrgId, employee, manager, UserId, ct))
            throw new NotFoundException("Employee", employee);

        return await repository.GetAsync(OrgId, ct);
    }
}

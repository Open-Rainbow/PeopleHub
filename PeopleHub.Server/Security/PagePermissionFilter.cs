using Microsoft.AspNetCore.Mvc.Filters;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Setup.Interfaces;

namespace PeopleHub.Server.Security;

/// <summary>
/// Global filter: checks the caller's role against the page permissions configured on the Setup page.
/// Role = "role" claim when signed in, else the X-PeopleHub-Role header the app sends.
/// No role: allowed unless Access:RequireRole is true (keeps tools / tests working until the login API exists).
/// </summary>
internal sealed class PagePermissionFilter(
    IAccessService access,
    IRequestContext context,
    IConfiguration configuration,
    ILogger<PagePermissionFilter> logger) : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext ctx, ActionExecutionDelegate next)
    {
        var request = ctx.HttpContext.Request;
        var rule = ApiPermissionMap.Match(request.Method, request.Path.Value);
        if (rule is null || rule.Public)
        {
            await next();
            return;
        }

        var role = context.Role;
        if (string.IsNullOrWhiteSpace(role))
        {
            if (configuration.GetValue<bool>("Access:RequireRole"))
                throw new ForbiddenException("Sign in again: your role is missing.");
            logger.LogDebug("No role on {Method} {Path}; page permission check skipped.", request.Method, request.Path);
            await next();
            return;
        }

        if (!await access.IsAllowedAsync(role, rule.Pages, rule.Action, ctx.HttpContext.RequestAborted))
        {
            logger.LogInformation("Role {Role} denied {Action} on {Pages} ({Method} {Path}).", role, rule.Action, string.Join(",", rule.Pages), request.Method, request.Path);
            throw new ForbiddenException($"Your role is not allowed to {rule.Action} here. Ask an admin to update your access on the Setup page.");
        }

        await next();
    }
}

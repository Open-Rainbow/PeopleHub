using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Server.Configuration;
using PeopleHub.Server.Context;
using PeopleHub.Server.Errors;
using PeopleHub.Server.Middleware;

namespace PeopleHub.Server.Extensions;

public static class ApiServiceExtensions
{
    public const string CorsPolicyName = "PeopleHubCorsPolicy";

    public static IServiceCollection AddPeopleHubApi(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddOpenApi();

        services.AddProblemDetails(options =>
            options.CustomizeProblemDetails = context =>
            {
                context.ProblemDetails.Extensions["traceId"] = context.HttpContext.TraceIdentifier;
                if (context.HttpContext.Items[CorrelationIdMiddleware.ItemKey] is string correlationId)
                {
                    context.ProblemDetails.Extensions["correlationId"] = correlationId;
                }
            });
        services.AddExceptionHandler<GlobalExceptionHandler>();

        services.AddHttpContextAccessor();
        services.Configure<OrganizationOptions>(configuration.GetSection(OrganizationOptions.SectionName));
        services.AddScoped<IRequestContext, HttpRequestContext>();

        services.AddPeopleHubCors(configuration);
        services.AddPeopleHubAuthentication(configuration);

        return services;
    }

    private static void AddPeopleHubCors(this IServiceCollection services, IConfiguration configuration)
    {
        var origins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

        services.AddCors(options => options.AddPolicy(CorsPolicyName, policy => policy
            .WithOrigins(origins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithExposedHeaders(CorrelationIdMiddleware.HeaderName)));
    }

    private static void AddPeopleHubAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var section = configuration.GetSection(JwtOptions.SectionName);
        services.Configure<JwtOptions>(section);
        var jwt = section.Get<JwtOptions>() ?? new JwtOptions();

        if (!jwt.Enabled)
        {
            // Dev mode until the login API exists: no scheme, no fallback policy.
            services.AddAuthentication();
            services.AddAuthorization();
            return;
        }

        if (string.IsNullOrWhiteSpace(jwt.SigningKey) || jwt.SigningKey.Length < 32)
        {
            throw new InvalidOperationException(
                $"{JwtOptions.SectionName}:SigningKey must be at least 32 characters when JWT is enabled.");
        }

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwt.Issuer,
                ValidateAudience = true,
                ValidAudience = jwt.Audience,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.SigningKey)),
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(1),
            });

        // Every endpoint requires a valid token unless it opts out with [AllowAnonymous].
        services.AddAuthorizationBuilder()
            .SetFallbackPolicy(new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build());
    }
}

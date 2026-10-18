using PeopleHub.Server.Middleware;

namespace PeopleHub.Server.Extensions;

public static class ApiPipelineExtensions
{
    public static WebApplication UsePeopleHubApi(this WebApplication app)
    {
        app.UseMiddleware<CorrelationIdMiddleware>();
        app.UseExceptionHandler();
        app.UseStatusCodePages();

        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseDefaultFiles();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "PeopleHub API V1");
                options.RoutePrefix = "swagger";
            });
            app.MapOpenApi().AllowAnonymous();
        }

        app.MapStaticAssets().AllowAnonymous();

        app.UseCors(ApiServiceExtensions.CorsPolicyName);
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
        app.MapFallbackToFile("/index.html").AllowAnonymous();

        return app;
    }
}

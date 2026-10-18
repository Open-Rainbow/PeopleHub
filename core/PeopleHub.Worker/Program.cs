using PeopleHub.Application;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Infrastructure;
using PeopleHub.Worker.Context;
using PeopleHub.Worker.Services;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddPeopleHubApplication()
    .AddPeopleHubInfrastructure(builder.Configuration);

builder.Services.AddScoped<WorkerRequestContext>();
builder.Services.AddScoped<IRequestContext>(sp => sp.GetRequiredService<WorkerRequestContext>());

builder.Services.AddHostedService<WorkerService>();

var app = builder.Build();
app.Run();

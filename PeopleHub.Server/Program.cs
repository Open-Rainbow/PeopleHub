using PeopleHub.Application;
using PeopleHub.Infrastructure;
using PeopleHub.Server.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddPeopleHubApplication()
    .AddPeopleHubInfrastructure(builder.Configuration)
    .AddPeopleHubApi(builder.Configuration);

var app = builder.Build();

app.UsePeopleHubApi();

app.Run();

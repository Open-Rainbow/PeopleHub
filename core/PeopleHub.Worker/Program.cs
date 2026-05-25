using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PeopleHub.Worker.Services;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<WorkerService>();

var app = builder.Build();
app.Run();

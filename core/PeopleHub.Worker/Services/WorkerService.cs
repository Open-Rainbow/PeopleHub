using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace PeopleHub.Worker.Services;

public sealed class WorkerService(ILogger<WorkerService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("PeopleHub worker host started at: {Time}", DateTimeOffset.Now);

        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogDebug("PeopleHub worker heartbeat at: {Time}", DateTimeOffset.Now);
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }

        logger.LogInformation("PeopleHub worker host stopping at: {Time}", DateTimeOffset.Now);
    }
}

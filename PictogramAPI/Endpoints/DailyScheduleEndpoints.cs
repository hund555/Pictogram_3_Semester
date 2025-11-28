using Microsoft.AspNetCore.Mvc;
using PictogramAPI.Services.DTOCollection;
using PictogramAPI.Services.Interfaces;

namespace PictogramAPI.Endpoints
{
    public static class DailyScheduleEndpoints
    {
        public static void MapDailyScheduleEndpoints(this WebApplication app)
        {
            app.MapPost("/dailyschedule/tasks", async (IDailyScheduleService dailyScheduleService, [FromBody] CreateDailyTaskDTO createDailyTaskDTO) =>
            {
                try
                {
                    await dailyScheduleService.CreateDailyScheduleTask(createDailyTaskDTO);
                    return Results.Created();
                }
                catch (NullReferenceException e)
                {
                    return Results.NotFound(new { message = e.Message });
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("DailySchedule")
            .WithName("CreateDailyTask")
            .WithSummary("Create a new daily schedule task in the system.");

            app.MapGet("/dailyschedule/today", async (IDailyScheduleService dailyScheduleService, string userId) =>
            {
                try
                {
                    List<DisplayDayScheduleDTO> daySchedule = await dailyScheduleService.GetDayScheduleByUserIdAndDay(userId, DateTime.Today.ToString());
                    return Results.Ok(daySchedule);
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("DailySchedule")
            .WithName("GetCurrentDaySchedule")
            .WithSummary("Get schedule task for the current day");
        }
    }
}

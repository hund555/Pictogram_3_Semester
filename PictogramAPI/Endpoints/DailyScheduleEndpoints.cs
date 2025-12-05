using Microsoft.AspNetCore.Mvc;
using PictogramAPI.Services.DTOCollection.DailyScheduleDTOs;
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

            app.MapGet("/dailyschedule/today/{userId}", async (IDailyScheduleService dailyScheduleService, string userId) =>
            {
                try
                {
                    string day = DateTime.Today.DayOfWeek.ToString();
                    DisplayDayScheduleDTO daySchedule = await dailyScheduleService.GetDayScheduleByUserIdAndDay(userId, day);
                    return Results.Ok(daySchedule);
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("DailySchedule")
            .WithName("GetCurrentDaySchedule")
            .WithSummary("Get schedule tasks for the current day");

            app.MapGet("/dailyschedule/{day}/{userId}", async (IDailyScheduleService dailyScheduleService, string day, string userId) =>
            {
                try
                {
                    DisplayDayScheduleDTO daySchedule = await dailyScheduleService.GetDayScheduleByUserIdAndDay(userId, day);
                    return Results.Ok(daySchedule);
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("DailySchedule")
            .WithName("GetRequestedDaySchedule")
            .WithSummary("Get schedule tasks for requested day");
        }
    }
}

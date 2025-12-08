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

            app.MapGet("/dailyschedule/today", async (IDailyScheduleService dailyScheduleService,[FromBody] string userId) =>
            {
                try
                {
                    DisplayDayScheduleDTO daySchedule = await dailyScheduleService.GetDayScheduleByUserIdAndDay(userId, DateTime.Today.ToString());
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

            app.MapGet("/dailyschedule/day", async (IDailyScheduleService dailyScheduleService,[FromBody] GetDailyScheduleDayDTO getDailyScheduleDayDTO) =>
            {
                try
                {
                    DisplayDayScheduleDTO daySchedule = await dailyScheduleService.GetDayScheduleByUserIdAndDay(getDailyScheduleDayDTO.UserId, getDailyScheduleDayDTO.Day);
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

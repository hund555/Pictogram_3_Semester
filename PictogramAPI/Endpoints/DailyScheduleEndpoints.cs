using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using PictogramAPI.Services.DTOCollection.DailyScheduleDTOs;
using PictogramAPI.Services.Interfaces;
using System.ComponentModel;

namespace PictogramAPI.Endpoints
{
    /// <summary>
    /// Contains all dailySchedule-related API endpoints.
    /// </summary>
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
            .WithSummary("Create a new daily schedule task in the system.")
            .RequireAuthorization();

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
            .WithSummary("Get schedule tasks for the current day")
            .RequireAuthorization();

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
            .WithSummary("Get schedule tasks for requested day")
            .RequireAuthorization();

            app.MapPut("/dailyschedule/updateIndex", async(IDailyScheduleService dailyScheduleService, [FromBody] UpdateDailyScheduleTaskIndexDTO updateDailyScheduleTaskIndexDTO) =>
            {
                try
                {
                    await dailyScheduleService.UpdateDailyScheduleTaskIndex(updateDailyScheduleTaskIndexDTO);
                    return Results.Ok();
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            
            })
            .WithTags("DailySchedule")
            .WithName("UpdateDailyScheduleTaskIndex")
            .WithSummary("Updates the Index of the Task with given id to the provided new id")
            .RequireAuthorization();

            app.MapDelete("/dailyschedule/deleteTaskById/{taskId}", async (IDailyScheduleService dailyScheduleService, string taskId) =>
            {
                try
                {
                    await dailyScheduleService.DeleteDailyScheduleTasksByTaskId(taskId);
                    return Results.Ok();
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }

            })
            .WithTags("DailySchedule")
            .WithName("DeleteDailyScheduleTaskbyId")
            .WithSummary("Deletes the task with given id")
            .RequireAuthorization();
        }
    }
}

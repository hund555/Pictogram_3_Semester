using PictogramAPI.Services.DTOCollection.DailyScheduleDTOs;

namespace PictogramAPI.Services.Interfaces
{
    /// <summary>
    /// A Daily scehdueke interface defining DAilyScheduele-related operations
    /// </summary>
    public interface IDailyScheduleService
    {
        Task CreateDailyScheduleTask(CreateDailyTaskDTO dailyTaskDTO);
        Task<DisplayDayScheduleDTO> GetDayScheduleByUserIdAndDay(string userId, string day);
        Task DeleteDailyScheduleTaskByPictogramId(string pictogramId);
        Task DeleteDailyScheduleTasksByUserId(string userId);
        Task UpdateDailyScheduleTaskIndex(UpdateDailyScheduleTaskIndexDTO updateDailyScheduleTaskIndexDTO);
        Task DeleteDailyScheduleTasksByTaskId(string taskId);
    }
}
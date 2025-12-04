using PictogramAPI.Services.DTOCollection.DailyScheduleDTOs;

namespace PictogramAPI.Services.Interfaces
{
    public interface IDailyScheduleService
    {
        Task CreateDailyScheduleTask(CreateDailyTaskDTO dailyTaskDTO);
        Task<DisplayDayScheduleDTO> GetDayScheduleByUserIdAndDay(string userId, string day);
        Task DeleteDailyScheduleTaskByPictogramId(string pictogramId);
        Task DeleteDailyScheduleTasksByUserId(string userId);
    }
}
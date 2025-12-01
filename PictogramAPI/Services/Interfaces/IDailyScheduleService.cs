using PictogramAPI.Services.DTOCollection.DailyScheduleDTOs;

namespace PictogramAPI.Services.Interfaces
{
    public interface IDailyScheduleService
    {
        Task CreateDailyScheduleTask(CreateDailyTaskDTO dailyTaskDTO);
        Task<List<DisplayDayScheduleDTO>> GetDayScheduleByUserIdAndDay(string userId, string day);
    }
}
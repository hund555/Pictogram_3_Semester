using PictogramAPI.Services.DTOCollection;

namespace PictogramAPI.Services.Interfaces
{
    public interface IDailyScheduleService
    {
        Task CreateDailyScheduleTask(CreateDailyTaskDTO dailyTaskDTO);
    }
}
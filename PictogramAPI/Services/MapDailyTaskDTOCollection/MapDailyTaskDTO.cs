using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection;

namespace PictogramAPI.Services.MapDailyTaskDTOCollection
{
    public static class MapDailyTaskDTO
    {
        public static DailyScheduleTask MapCreateDailyTaskDTOToDomainDailyScheduleTask(this CreateDailyTaskDTO dailyTaskDTO)
        {
            return new DailyScheduleTask
            {
                Id = Guid.NewGuid().ToString(),
                UserId = dailyTaskDTO.UserId,
                Day = dailyTaskDTO.Day,
                PictogramId = dailyTaskDTO.PictogramId,
                Index = dailyTaskDTO.Index
            };
        }
    }
}

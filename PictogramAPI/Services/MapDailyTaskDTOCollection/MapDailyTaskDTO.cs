using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection;

namespace PictogramAPI.Services.MapDailyTaskDTOCollection
{
    public static class MapDailyTaskDTO
    {
        /// <summary>
        /// Map CreateDailyTaskDTO to DailyScheduleTask domain object
        /// </summary>
        /// <param name="dailyTaskDTO"></param>
        /// <returns></returns>
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

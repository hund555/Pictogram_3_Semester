
namespace PictogramAPI.Services.DTOCollection.DailyScheduleDTOs
{
    /// <summary>
    /// Data Transfer Object used to update the order of tasks within a daily schedule.
    /// </summary>
    public class UpdateDailyScheduleTaskIndexDTO
    {
        public string TaskId { get; set; }
        public int Index { get; set; }
        public string OccupandTaskId { get; set; }
    }
}
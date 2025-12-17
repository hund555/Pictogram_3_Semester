using PictogramAPI.Domain;

namespace PictogramAPI.Services.DTOCollection.DailyScheduleDTOs
{
    /// <summary>
    /// Data Transfer Object used to return task data when displaying tasks in a daily schedule.
    /// </summary>
    public class DisplayTaskDTO
    {
        public string DailyScheduleTaskId { get; set; }
        public int Index { get; set; }
        public Pictogram Pictogram { get; set; }
    }
}

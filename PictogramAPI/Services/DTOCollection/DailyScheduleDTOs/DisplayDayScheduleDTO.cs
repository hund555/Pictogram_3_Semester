namespace PictogramAPI.Services.DTOCollection.DailyScheduleDTOs
{
    /// <summary>
    /// Data Transfer Object used to return a daily schedule including the associated tasks for a specific day.
    /// </summary>
    public class DisplayDayScheduleDTO
    {
        public string Day { get; set; }
        public List<DisplayTaskDTO> Tasks { get; set; }
    }
}

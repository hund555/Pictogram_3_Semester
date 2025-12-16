namespace PictogramAPI.Services.DTOCollection.DailyScheduleDTOs
{
    public class DisplayDayScheduleDTO
    {
        public string Day { get; set; }
        public List<DisplayTaskDTO> Tasks { get; set; }
    }
}

using PictogramAPI.Domain;

namespace PictogramAPI.Services.DTOCollection.DailyScheduleDTOs
{
    public class DisplayTaskDTO
    {
        public string DailyScheduleTaskId { get; set; }
        public int Index { get; set; }
        public Pictogram Pictogram { get; set; }
    }
}

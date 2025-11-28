using PictogramAPI.Domain;

namespace PictogramAPI.Services.DTOCollection
{
    public class DisplayTaskDTO
    {
        public string DailyScheduleTaskId { get; set; }
        public int Index { get; set; }
        public Pictogram Pictogram { get; set; }
    }
}

namespace PictogramAPI.Services.DTOCollection.DailyScheduleDTOs
{
    public class CreateDailyTaskDTO
    {
        public string UserId { get; set; }
        public string Day { get; set; }
        public string PictogramId { get; set; }
        public int Index { get; set; }
    }
}

namespace PictogramAPI.Services.DTOCollection.DailyScheduleDTOs
{
    /// <summary>
    /// Data Transfer Object used to create a new task in a daily schedule.
    /// </summary>
    public class CreateDailyTaskDTO
    {
        public string UserId { get; set; }
        public string Day { get; set; }
        public string PictogramId { get; set; }
        public int Index { get; set; }
    }
}

namespace PictogramAPI.Domain
{
    /// <summary>
    /// Domain model representing a daily scheduele in the system.
    /// </summary>
    public class DailyScheduleTask
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Day { get; set; }
        public string PictogramId { get; set; }
        public int Index { get; set; }
    }
}

namespace PictogramAPI.Domain
{
    public class DailyScheduleTask
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Day { get; set; }
        public Pictogram Pictogram { get; set; }
        public int Index { get; set; }
    }
}

namespace PictogramAPI.Domain
{
    public class DailySchedule
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public DayOfWeek Day { get; set; }
        public Pictogram Pictogram { get; set; }
        public int Index { get; set; }
    }
}

namespace PictogramAPI.Services.DTOCollection.DailyScheduleDTOs
{
    public class GetDailyScheduleDayDTO
    {
        /// <summary>
        /// Data Transfer Object used to request a daily schedule for a specific user and day.
        /// </summary>
        public string UserId { get; set; }
        public string Day { get; set; }
    }
}

namespace PictogramAPI.Services
{
    /// <summary>
    /// A Service class to hold configuration values for the database
    /// </summary>
    public class DatabaseInfo
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string UserCollectionName { get; set; }
        public string PictogramCollectionName { get; set; }
        public string DailyScheduleCollectionName { get; set; }
    }
}

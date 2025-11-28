namespace PictogramAPI.Services
{
    public class DatabaseInfo
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string UserCollectionName { get; set; }
        public string PictogramCollectionName { get; set; }
        public string PictureCollectionName { get; set; }
        public string DailyScheduleCollectionName { get; set; }
    }
}

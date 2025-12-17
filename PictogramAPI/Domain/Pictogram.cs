using MongoDB.Bson;

namespace PictogramAPI.Domain
{
    /// <summary>
    /// Domain model representing a pictogram in the system.
    /// </summary>
    public class Pictogram
    {
        public ObjectId _id { get; set; }
        public string PictogramId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte[] PictureBytes { get; set; }
        public string FileType { get; set; }
        public string UserId { get; set; }
        public bool IsPrivate { get; set; }
    }
}

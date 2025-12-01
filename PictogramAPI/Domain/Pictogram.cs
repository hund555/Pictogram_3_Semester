namespace PictogramAPI.Domain
{
    public class Pictogram
    {
        public string PictogramId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte[] PictureBytes { get; set; }
        public string FileType { get; set; }
        public string UserId { get; set; }
        public bool IsPrivate { get; set; }
    }
}

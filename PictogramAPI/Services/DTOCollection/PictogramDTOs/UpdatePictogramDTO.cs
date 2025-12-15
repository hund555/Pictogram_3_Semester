namespace PictogramAPI.Services.DTOCollection.PictogramDTOs
{
    public class UpdatePictogramDTO
    {
        public string PictogramId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public string FileType { get; set; }
        public string UserId { get; set; }
        public bool IsPrivate { get; set; }
    }
}

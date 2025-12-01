namespace PictogramAPI.Services.DTOCollection.PictogramDTOs
{
    public class CreatePictogramDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileType { get; set; }
        public bool IsPrivate { get; set; }
        public byte[] PictureBytes { get; set; }
        public string UserId { get; set; }
    }
}

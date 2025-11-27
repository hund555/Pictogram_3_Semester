namespace PictogramAPI.Services.DTOCollection
{
    public class CreatePictogramDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileType { get; set; }
        public bool IsPrivate { get; set; }
    }
}

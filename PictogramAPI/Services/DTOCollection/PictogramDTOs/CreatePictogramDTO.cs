namespace PictogramAPI.Services.DTOCollection.PictogramDTOs
{
    /// <summary>
    /// Data Transfer Object used to create a new pictogram in the system.
    /// </summary>
    public class CreatePictogramDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileType { get; set; }
        public bool IsPrivate { get; set; }
        public string Picture { get; set; }
        public string UserId { get; set; }
    }
}

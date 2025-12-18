using PictogramAPI.Domain;

namespace PictogramAPI.Services.DTOCollection.PictogramDTOs
{
    public class DisplayAllPictogramsDTO
    {
        /// <summary>
        /// Data Transfer Object used to return pictogram data when displaying pictograms to the client.
        /// </summary>
        public string PictogramId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileType { get; set; }
        public bool IsPrivate { get; set; }
        public string Picture { get; set; }
        public string UserId { get; set; }
    }
}

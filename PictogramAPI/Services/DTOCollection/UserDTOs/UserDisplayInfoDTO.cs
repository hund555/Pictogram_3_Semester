namespace PictogramAPI.Services.DTOCollection.UserDTOs
{
    /// <summary>
    /// Data Transfer Object used to expose user information to client
    /// </summary>
    public class UserDisplayInfoDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}

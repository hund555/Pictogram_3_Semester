namespace PictogramAPI.Services.DTOCollection.UserDTOs
{
    /// <summary>
    /// Data Transfer Object used to receive user login credentials from the client.
    /// </summary>
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

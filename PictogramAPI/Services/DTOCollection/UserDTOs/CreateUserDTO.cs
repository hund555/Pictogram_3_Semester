namespace PictogramAPI.Services.DTOCollection.UserDTOs
{
    /// <summary>
    /// Data Transfer Object used to create a new user in the system.
    /// </summary>
    public class CreateUserDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

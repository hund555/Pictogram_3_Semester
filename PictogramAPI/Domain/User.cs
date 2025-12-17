namespace PictogramAPI.Domain
{
    /// <summary>
    /// Domain model representing a user in the system.
    /// </summary>
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public string Role { get; set; }
    }
}

namespace WPF_PictoPlanner_Admin.Models
{
    /// <summary>
    /// A class to hold all information of a user from the MongoDB
    /// </summary>
    public class User
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}

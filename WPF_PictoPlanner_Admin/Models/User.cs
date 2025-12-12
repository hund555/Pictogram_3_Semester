namespace WPF_PictoPlanner_Admin.Models
{
    /// <summary>
    /// A class to hold all information of a user from the MongoDB
    /// </summary>
    public class User : Bindable
    {
        private string id;
        public string Id
        {
            get { return id; }
            set => SetProperty(ref id, value);
        }

        private string name;
        public string Name
        {
            get { return name; }
            set => SetProperty(ref name, value);
        }

        private string email;
        public string Email
        {
            get { return email; }
            set => SetProperty(ref email, value);
        }

        private string role;
        public string Role
        {
            get { return role; }
            set => SetProperty(ref role, value);
        }
    }
}

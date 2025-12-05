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
            set { id = value; propertyIsChanged(); }
        }

        private string name;
        public string Name
        {
            get { return name; }
            set { name = value; propertyIsChanged(); }
        }

        private string email;
        public string Email
        {
            get { return email; }
            set { email = value; propertyIsChanged(); }
        }

        private string role;
        public string Role
        {
            get { return role; }
            set { role = value; propertyIsChanged(); }
        }
    }
}

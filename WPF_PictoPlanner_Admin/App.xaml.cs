using System.Windows;
using WPF_PictoPlanner_Admin.Services;
using WPF_PictoPlanner_Admin.Services.Interfaces;

namespace WPF_PictoPlanner_Admin
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public static IUserService UserService { get; private set; }

        public App()
        {
            UserService = new UserService(); // SINGLE SHARED SERVICE
        }
    }

}

using System.Windows;
using System.Windows.Controls;
using WPF_PictoPlanner_Admin.ViewModels;

namespace WPF_PictoPlanner_Admin.View
{
    public partial class Login : UserControl
    {
        public Login()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Update the Login class password while typing
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void PasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
        {
            if (DataContext is LoginViewModel vm)
            {
                vm.Login.Password = ((PasswordBox)sender).Password;
            }
        }
    }
}

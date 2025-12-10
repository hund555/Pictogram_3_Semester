using System.Windows;
using System.Windows.Controls;
using WPF_PictoPlanner_Admin.ViewModels;

namespace WPF_PictoPlanner_Admin.View
{
    public partial class Login : UserControl
    {
        private LoginViewModel _viewModel;
        public Login()
        {
            DataContext = _viewModel = new LoginViewModel();
            InitializeComponent();
        }

        private void PasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
        {
            _viewModel.Login.Password = ((PasswordBox)sender).Password;
        }
    }
}

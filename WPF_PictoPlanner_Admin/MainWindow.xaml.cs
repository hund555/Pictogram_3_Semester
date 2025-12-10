using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using WPF_PictoPlanner_Admin.Models;
using WPF_PictoPlanner_Admin.Util;
using WPF_PictoPlanner_Admin.ViewModels;

namespace WPF_PictoPlanner_Admin
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Bindable _users;
        private Bindable _login;
        public MainWindow()
        {
            InitializeComponent();

            SessionManager.LoginStateChanged += () =>
            {
                // Forces XAML to re-evaluate all bindings
                Dispatcher.Invoke(() =>
                {
                    BindingOperations.GetBindingExpressionBase(btn_login, Button.VisibilityProperty)?.UpdateTarget();
                    BindingOperations.GetBindingExpressionBase(btn_users, Button.VisibilityProperty)?.UpdateTarget();
                    BindingOperations.GetBindingExpressionBase(btn_logout, Button.VisibilityProperty)?.UpdateTarget();
                });
            };

            DataContext = _login = _login?? new LoginViewModel();
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            DataContext = _login = _login?? new UsersViewModel();
        }

        private void Users_Click(object sender, RoutedEventArgs e)
        {
            DataContext = _users = _users ?? new UsersViewModel();
        }

        private void Logout_Click(object sender, RoutedEventArgs e)
        {
            SessionManager.SetUser(null);
            DataContext = _login = _login?? new LoginViewModel();
        }
    }
}
using System.Windows;
using System.Windows.Input;
using WPF_PictoPlanner_Admin.Commands;
using WPF_PictoPlanner_Admin.Models;
using WPF_PictoPlanner_Admin.Services.Interfaces;

namespace WPF_PictoPlanner_Admin.ViewModels
{
    /// <summary>
    /// ViewModel responsible for handling user authentication.
    /// </summary>
    public class LoginViewModel : BaseViewModel
    {
        public Login Login { get; set; } = new Login();
        private readonly IUserService _userService = App.UserService;
        private ICommand? _loginCommand;

        private readonly MainViewModel _main;
        public LoginViewModel(MainViewModel main)
        {
            _main = main;
        }

        // Command used to authenticate the user and navigate to the main admin view
        public ICommand LoginCommand
        {
            get
            {
                if (_loginCommand == null)
                {
                    _loginCommand = new RelayCommand(
                        param => param is Login,
                        async param =>
                        {
                            if (param is Login login)
                            {
                                User user = await _userService.Login(login);
                                if (user != null)
                                {
                                    _main.CurrentUser = user;
                                    _main.IsLoggedIn = true;
                                    _main.CurrentPage = new UsersViewModel();
                                }
                            }
                        });
                }
                return _loginCommand;
            }
        }

        // Called when the user logs out to notify the backend service
        public void OnLogout()
        {
            try
            {
                _userService.Logout();
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
        }
    }
}

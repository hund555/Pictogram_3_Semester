using System.Windows.Input;
using WPF_PictoPlanner_Admin.Commands;
using WPF_PictoPlanner_Admin.Models;
using WPF_PictoPlanner_Admin.Services.Interfaces;
using WPF_PictoPlanner_Admin.Util;

namespace WPF_PictoPlanner_Admin.ViewModels
{
    public class LoginViewModel : Bindable
    {
        public Login Login { get; set; }
        private readonly IUserService _userService = App.UserService;
        private ICommand? _loginCommand;
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
                                SessionManager.SetUser(user);
                            }
                        });
                }
                return _loginCommand;
            }
        }
    }
}

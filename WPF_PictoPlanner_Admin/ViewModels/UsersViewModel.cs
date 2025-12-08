using System.Collections.ObjectModel;
using System.Windows.Input;
using WPF_PictoPlanner_Admin.Commands;
using WPF_PictoPlanner_Admin.Models;
using WPF_PictoPlanner_Admin.Services;
using WPF_PictoPlanner_Admin.Services.Interfaces;

namespace WPF_PictoPlanner_Admin.ViewModels
{
    public class UsersViewModel : Bindable
    {
        public ObservableCollection<User> UsersList { get; set; } = new ObservableCollection<User>();
        private IUserService _userService = new UserService();

        public UsersViewModel()
        {

        }

        private ICommand? _loadUsersCommand;
        public ICommand LoadUsersCommand
        {
            get
            {
                if (_loadUsersCommand == null)
                {
                    _loadUsersCommand = new RelayCommand(
                        param => true,
                        async param =>
                        {
                            var users = await _userService.GetAllUsersAsync();
                            UsersList.Clear();
                            foreach (var user in users)
                            {
                                UsersList.Add(user);
                            }
                        });
                }
                return _loadUsersCommand;
            }
        }

        private ICommand? _deleteUserCommand;
        public ICommand DeleteUserCommand
        {
            get
            {
                if (_deleteUserCommand == null)
                {
                    _deleteUserCommand = new RelayCommand(
                        param => param is User,
                        async param =>
                        {
                            if (param is User user)
                            {
                                await _userService.DeleteUserByIdAsync(user.Id);
                                UsersList.Remove(user);
                            }
                        });
                }
                return _deleteUserCommand;
            }
        }
    }
}

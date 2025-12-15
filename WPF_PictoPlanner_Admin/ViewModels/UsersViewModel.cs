using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Input;
using WPF_PictoPlanner_Admin.Commands;
using WPF_PictoPlanner_Admin.Models;
using WPF_PictoPlanner_Admin.Services.Interfaces;

namespace WPF_PictoPlanner_Admin.ViewModels
{
    public class UsersViewModel : BaseViewModel
    {
        public ObservableCollection<User> UsersList { get; set; } = new ObservableCollection<User>();
        public ObservableCollection<string> Roles { get; set; } = new ObservableCollection<string>();
        private IUserService _userService = App.UserService;

        public UsersViewModel()
        {
            Roles.Add("Admin");
            Roles.Add("User");
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
                            try
                            {
                                var users = await _userService.GetAllUsersAsync();
                                UsersList.Clear();
                                foreach (var user in users)
                                {
                                    UsersList.Add(user);
                                }
                            }
                            catch (Exception e)
                            {
                                MessageBox.Show(e.Message);
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
                                try
                                {
                                    await _userService.DeleteUserByIdAsync(user.Id);
                                    UsersList.Remove(user);
                                }
                                catch (Exception e)
                                {
                                    MessageBox.Show(e.Message);
                                }
                            }
                        });
                }
                return _deleteUserCommand;
            }
        }

        private ICommand? _updateUserRoleCommand;
        public ICommand UpdateUserRoleCommand
        {
            get
            {
                if (_updateUserRoleCommand == null)
                {
                    _updateUserRoleCommand = new RelayCommand(
                        param => param is User,
                        async param =>
                        {
                            if (param is User user)
                            {
                                try
                                {
                                    await _userService.UpdateUserRoleAsync(user.Id, user.Role);
                                }
                                catch (Exception e)
                                {
                                    MessageBox.Show(e.Message);
                                }
                            }
                        });
                }
                return _updateUserRoleCommand;
            }
        }
    }
}

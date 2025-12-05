using System.Collections.ObjectModel;
using System.Windows.Input;
using WPF_PictoPlanner_Admin.Commands;
using WPF_PictoPlanner_Admin.Models;
using WPF_PictoPlanner_Admin.Services;
using WPF_PictoPlanner_Admin.Services.Interfaces;

namespace WPF_PictoPlanner_Admin.ViewModels
{
    public class UsersViewModel
    {
        public ObservableCollection<User> Users {  get; set; } = new ObservableCollection<User>();
        private IUserService _userService = new UserService();

        public UsersViewModel() 
        {

        }

        private ICommand? _loadUsersCommand;

        public ICommand LoadUsersCommand => _loadUsersCommand ??= new RelayCommand(async _ =>
        {
            var users = await _userService.GetAllUsersAsync();
            Users.Clear();
            foreach (var user in users)
            {
                Users.Add(user);
            }
        });
    }
}

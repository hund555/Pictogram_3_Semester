using System.Collections.ObjectModel;
using WPF_PictoPlanner_Admin.Models;

namespace WPF_PictoPlanner_Admin.ViewModels
{
    public class UsersListViewModel
    {
        private ObservableCollection<User> users {  get; set; }

        public UsersListViewModel() { }
    }
}

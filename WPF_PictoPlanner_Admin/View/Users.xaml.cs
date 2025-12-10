using System.Windows.Controls;
using WPF_PictoPlanner_Admin.ViewModels;

namespace WPF_PictoPlanner_Admin.View
{
    public partial class Users : UserControl
    {
        private readonly UsersViewModel _viewModel;
        public Users()
        {
            DataContext = _viewModel = new UsersViewModel();
            InitializeComponent();
            _viewModel.LoadUsersCommand.Execute(this);
        }
    }
}

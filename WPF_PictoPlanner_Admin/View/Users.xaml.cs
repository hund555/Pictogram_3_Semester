using System.Windows.Controls;
using System.Windows.Input;
using WPF_PictoPlanner_Admin.Commands;
using WPF_PictoPlanner_Admin.ViewModels;

namespace WPF_PictoPlanner_Admin.View
{
    /// <summary>
    /// Interaction logic for Users.xaml
    /// </summary>
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

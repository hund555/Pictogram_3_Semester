using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using WPF_PictoPlanner_Admin.ViewModels;

namespace WPF_PictoPlanner_Admin.View
{
    /// <summary>
    /// Interaction logic for Users.xaml
    /// </summary>
    public partial class Users : Window
    {
        private readonly UsersViewModel _viewModel;
        public Users()
        {
            DataContext = _viewModel = new UsersViewModel();
            InitializeComponent();
        }

        protected override void OnInitialized(EventArgs e)
        {
            base.OnInitialized(e);
        }

        private void UsersList_CanExecute(object sender, CanExecuteRoutedEventArgs e)
        {
            _viewModel.LoadUsersCommand.Execute(null);
        }
    }
}

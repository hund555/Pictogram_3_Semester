using System.Windows;
using WPF_PictoPlanner_Admin.ViewModels;

namespace WPF_PictoPlanner_Admin
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private MainViewModel _viewModel;
        public MainWindow()
        {
            InitializeComponent();

            DataContext = _viewModel = new MainViewModel();
            _viewModel.CurrentPage = new LoginViewModel(_viewModel);
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            _viewModel.CurrentPage = new UsersViewModel();
        }

        private void Users_Click(object sender, RoutedEventArgs e)
        {
            _viewModel.CurrentPage = new UsersViewModel();
        }
    }
}
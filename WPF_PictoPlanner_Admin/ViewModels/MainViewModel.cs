using System.Windows.Input;
using WPF_PictoPlanner_Admin.Commands;
using WPF_PictoPlanner_Admin.Models;

namespace WPF_PictoPlanner_Admin.ViewModels
{
    /// <summary>
    ///  Main ViewModel responsible for controlling application state,
    ///  navigation between views and authentication status.
    /// </summary>
    public class MainViewModel : BaseViewModel
    {
        private BaseViewModel _currentPage;
        public BaseViewModel CurrentPage
        {
            get => _currentPage;
            set => SetProperty(ref _currentPage, value);
        }

        private bool _isLoggedIn;
        public bool IsLoggedIn
        {
            get { return _isLoggedIn; }
            set => SetProperty(ref _isLoggedIn, value);
        }

        private User? _currentUser;
        public User? CurrentUser
        {
            get => _currentUser;
            set => SetProperty(ref _currentUser, value);
        }

        public MainViewModel()
        {
            
        }

        private ICommand? _logoutCommand;
        public ICommand LogoutCommand
        {
            get
            {
                return _logoutCommand ??= new RelayCommand(
                    param => true,
                    param =>
                    {
                        CurrentUser = null;
                        IsLoggedIn = false;
                        CurrentPage = new LoginViewModel(this);
                        if (CurrentPage is LoginViewModel loginVM)
                        {
                            loginVM.OnLogout();
                        }
                    });
            }
        }
    }
}

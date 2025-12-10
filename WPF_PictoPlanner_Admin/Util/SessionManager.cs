using WPF_PictoPlanner_Admin.Models;

namespace WPF_PictoPlanner_Admin.Util
{
    public static class SessionManager
    {
        private static User? _currentUser;
        public static User? CurrentUser { get => _currentUser; private set 
            { 
                _currentUser = value;
                LoginStateChanged?.Invoke();
            } 
        }
        public static event Action? LoginStateChanged;

        public static void SetUser(User? user)
        {
            CurrentUser = user;
        }

        public static bool IsLoggedIn => CurrentUser != null;
        public static bool IsAdmin => CurrentUser?.Role == "Admin";
    }
}

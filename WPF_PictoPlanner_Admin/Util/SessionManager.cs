using WPF_PictoPlanner_Admin.Models;

namespace WPF_PictoPlanner_Admin.Util
{
    public static class SessionManager
    {
        public static User? CurrentUser { get; private set; }
        public static event Action? UserChanged;

        public static void SetUser(User? user)
        {
            CurrentUser = user;
            UserChanged?.Invoke();
        }

        public static bool IsLoggedIn => CurrentUser != null;
        public static bool IsAdmin => CurrentUser?.Role == "Admin";
    }
}

using WPF_PictoPlanner_Admin.Models;

namespace WPF_PictoPlanner_Admin.Services.Interfaces
{
    /// <summary>
    /// An interface to retrieve and manage user data
    /// </summary>
    public interface IUserService
    {
        Task<ICollection<User>> GetAllUsersAsync();
        Task DeleteUserByIdAsync(string userId);
        Task UpdateUserRoleAsync(string userId, string newRole);
        Task<User> Login(Login login);
        Task Logout();
    }
}

using WPF_PictoPlanner_Admin.Models;

namespace WPF_PictoPlanner_Admin.Services.Interfaces
{
    /// <summary>
    /// Interface to retrieve and manage user data
    /// </summary>
    public interface IUserService
    {
        Task<ICollection<User>> GetAllUsersAsync();
    }
}

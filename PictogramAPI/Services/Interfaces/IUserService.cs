using PictogramAPI.Services.DTOCollection.UserDTOs;

namespace PictogramAPI.Services.Interfaces
{
    /// <summary>
    /// A User interface defining user-related operations
    /// </summary>
    public interface IUserService
    {
        Task<UserDisplayInfoDTO> GetUserDisplayInfoById(string id);
        Task CreateUser(CreateUserDTO userDTO);
        Lazy<Task<UserDisplayInfoDTO>> LoginUser(string email, string password);
        Lazy<Task<List<UserDisplayInfoDTO>>> GetAllUsers();
        Task DeleteUserById(string userId);
        Task UpdateUserRole(EditUserRoleDTO editUserRoleDTO);
    }
}
using PictogramAPI.Services.DTOCollection.UserDTOs;

namespace PictogramAPI.Services.Interfaces
{
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
using PictogramAPI.Services.DTO;
using PictogramAPI.Services.DTOCollection;

namespace PictogramAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDisplayInfoDTO> GetUserDisplayInfoById(string id);
        Task CreateUser(CreateUserDTO userDTO);
        Lazy<Task<UserDisplayInfoDTO>> LoginUser(string email, string password);
    }
}
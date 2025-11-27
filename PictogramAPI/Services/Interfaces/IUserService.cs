using PictogramAPI.Domain;
using PictogramAPI.Services.DTO;

namespace PictogramAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserById(string id);
        Task CreateUser(CreateUserDTO userDTO);
    }
}
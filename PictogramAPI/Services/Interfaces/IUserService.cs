using PictogramAPI.Services.DTO;

namespace PictogramAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task CreateUser(CreateUserDTO userDTO);
    }
}
using PictogramAPI.Services.DTOCollection;

namespace PictogramAPI.Services.Interfaces
{
    public interface IPictogramService
    {
        Task CreatePictogram(CreatePictogramDTO createPictogramDTO, string userId, IFormFile picture);
    }
}
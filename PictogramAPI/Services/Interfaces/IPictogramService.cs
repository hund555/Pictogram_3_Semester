using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection.PictogramDTOs;

namespace PictogramAPI.Services.Interfaces
{
    public interface IPictogramService
    {
        Task CreatePictogram(CreatePictogramDTO createPictogramDTO);
        Task<Pictogram> GetPictogramById(string pictogramId, string userId);
    }
}
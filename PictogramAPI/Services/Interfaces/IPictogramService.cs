using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection.PictogramDTOs;

namespace PictogramAPI.Services.Interfaces
{
    /// <summary>
    /// A Pictogram interface defining pictogram-related operations
    /// </summary>
    public interface IPictogramService
    {
        Task CreatePictogram(CreatePictogramDTO createPictogramDTO);
        Task<Pictogram> GetPictogramById(string pictogramId, string userId);
        Task DeleteUsersPrivatePictogramsByUserId(string userId);
        Task<List<Pictogram>> GetAllPictogramsByUserId(string userId);
        Task<List<DisplayAllPictogramsDTO>> GetAllPictogramsAsync(string userId);
        Task DeletePictogramsByPictogramId(string PictogramId);
        Task UpdatePictogram(UpdatePictogramDTO updatePictogramDTO);
    }
}
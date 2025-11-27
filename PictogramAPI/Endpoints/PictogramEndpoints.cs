using PictogramAPI.Services.DTOCollection;
using PictogramAPI.Services.Interfaces;

namespace PictogramAPI.Endpoints
{
    public static class PictogramEndpoints
    {
        public static void MapPictogramEndpoints(this WebApplication app)
        {
            app.MapPost("/pictograms", async (IPictogramService pictogramService, CreatePictogramDTO createPictogramDTO, string userId, IFormFile file) =>
            {
                await pictogramService.CreatePictogram(createPictogramDTO, userId, file);
                // Implementation for creating a pictogram goes here
                return Results.Created();
            });
        }
    }
}

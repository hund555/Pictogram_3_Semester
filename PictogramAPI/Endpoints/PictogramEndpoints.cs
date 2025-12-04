using Microsoft.AspNetCore.Mvc;
using PictogramAPI.Services.DTOCollection.PictogramDTOs;
using PictogramAPI.Services.Interfaces;

namespace PictogramAPI.Endpoints
{
    public static class PictogramEndpoints
    {
        public static void MapPictogramEndpoints(this WebApplication app)
        {
            app.MapPost("/pictograms", async (IPictogramService pictogramService,[FromBody] CreatePictogramDTO createPictogramDTO) =>
            {
                try
                {
                    await pictogramService.CreatePictogram(createPictogramDTO);
                    return Results.Created();
                }
                catch (NullReferenceException e)
                {
                    return Results.NotFound(new { message = e.Message });
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("Pictogram")
            .WithName("CreatePictogram")
            .WithSummary("Create a new pictogram in the system")
            .WithMetadata(new IgnoreAntiforgeryTokenAttribute())
            .AllowAnonymous();
        }
    }
}

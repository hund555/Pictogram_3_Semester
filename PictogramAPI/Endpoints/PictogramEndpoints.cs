using Microsoft.AspNetCore.Mvc;
using PictogramAPI.Services.DTOCollection.PictogramDTOs;
using PictogramAPI.Services.Interfaces;

namespace PictogramAPI.Endpoints
{
    public static class PictogramEndpoints
    {
        public static void MapPictogramEndpoints(this WebApplication app)
        {
            app.MapPost("/pictograms", async (IPictogramService pictogramService, HttpContext httpCtx, [FromBody] CreatePictogramDTO createPictogramDTO) =>
            {
                try
                {
                    string userId = httpCtx.User.FindFirst("user_id")?.Value;
                    if (userId == null)
                        return Results.Unauthorized();

                    createPictogramDTO.UserId = userId;

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
            .RequireAuthorization();

            app.MapGet("/pictograms", async (IPictogramService pictogramService, HttpContext httpCtx) =>
            {
                try
                {
                    string userId = httpCtx.User.FindFirst("user_id")?.Value;
                    if (userId == null) 
                        return Results.Unauthorized();

                    var getAllPictograms = await pictogramService.GetAllPictogramsAsync(userId);

                    return Results.Ok(getAllPictograms);

                }
                catch (Exception exception)
                {
                    return Results.Problem(detail: exception.Message);
                }
            })
                .WithTags("Pictogram")
                .WithName("GetAllPictograms")
                .WithSummary("Gets all no-private pictograms and the user's own private pictograms")
                .RequireAuthorization();
        }
    }
}

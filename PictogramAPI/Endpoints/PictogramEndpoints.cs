using Microsoft.AspNetCore.Mvc;
using PictogramAPI.Services.DTOCollection.PictogramDTOs;
using PictogramAPI.Services.Interfaces;

namespace PictogramAPI.Endpoints
{
    public static class PictogramEndpoints
    {
        public static void MapPictogramEndpoints(this WebApplication app)
        {
            app.MapPost("/pictograms/create", async (IPictogramService pictogramService,[FromBody] CreatePictogramDTO createPictogramDTO) =>
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

            app.MapGet("/pictograms/allpictograms", async (IPictogramService pictogramService, HttpContext infoOfAuthUser) =>
            {
                try
                {
                    string userID = infoOfAuthUser.User.FindFirst("user_id")?.Value;

                    //if (userID == null) return Results.Unauthorized();

                    var getAllPictograms = await pictogramService.GetAllPictogramsAsync(userID);

                    return Results.Ok(getAllPictograms);

                }
                catch (Exception exception) { return Results.Problem(detail: exception.Message); }
            })
                .WithTags("Pictogram")
                .WithName("GetAllPictograms")
                .WithSummary("Gets all no-private pictograms and the user's own private pictograms");
                //.RequireAuthorization();






            app.MapDelete("/pictograms/delete/{PictogramId}", async (IPictogramService pictogramService, string pictogramId ) => { 
                try
                {
                    pictogramService.DeletePictogramsByPictogramId(pictogramId);
                    return Results.Ok();
                }
                catch (Exception exception) { return Results.Problem(detail: exception.Message); }
            
            
            })
                .WithTags("Pictogram")
                .WithName("GetAllPictograms")
                .WithSummary("Gets all no-private pictograms and the user's own private pictograms")
                .RequireAuthorization();
            app.MapPost("/pictogram/update", async (IPictogramService pictogramService, [FromBody] UpdatePictogramDTO pictogramDTO) =>
            {
                try
                {
                    pictogramService.UpdatePictogram(pictogramDTO);
                    return Results.Ok();
                }
                catch (Exception exc) { return Results.Problem(detail: exc.Message);}
            })
                .WithTags("Pictogram")
                .WithName("GetAllPictograms")
                .WithSummary("Gets all no-private pictograms and the user's own private pictograms")
                .RequireAuthorization();
        }
        
    }
}

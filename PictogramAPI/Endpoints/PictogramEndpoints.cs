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
            .RequireAuthorization();

            app.MapGet("/pictograms/getAllPictograms", async (IPictogramService pictogramService, HttpContext httpCtx) =>
            {
                try
                {
                    string userId = httpCtx.User.FindFirst("user_id")?.Value;

                    var getAllPictograms = await pictogramService.GetAllPictogramsAsync(userId);

                    // The browser can cache the response for 60 seconds
                    httpCtx.Response.Headers["Cache-Control"] = "public, max-age=60";

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

            app.MapDelete("/pictograms/delete/{PictogramId}", async (IPictogramService pictogramService, string pictogramId ) => { 
                try
                {
                    pictogramService.DeletePictogramsByPictogramId(pictogramId);
                    return Results.Ok();
                }
                catch (Exception exception) 
                { 
                    return Results.Problem(detail: exception.Message); 
                }
            })
            .WithTags("Pictogram")
            .WithName("DeletePictograms")
            .WithSummary("Deletes pictogram with given PictogramId")
            .RequireAuthorization();

            app.MapPost("/pictogram/update", async (IPictogramService pictogramService, [FromBody] UpdatePictogramDTO pictogramDTO) =>
            {
                try
                {
                    pictogramService.UpdatePictogram(pictogramDTO);
                    return Results.Ok();
                }
                catch (Exception exc) 
                { 
                    return Results.Problem(detail: exc.Message);
                }
            })
            .WithTags("Pictogram")
            .WithName("UpdatePictogram")
            .WithSummary("Updates Pictogram with given data")
            .RequireAuthorization();
        }
    }
}

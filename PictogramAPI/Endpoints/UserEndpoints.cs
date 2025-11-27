using Microsoft.AspNetCore.Mvc;
using PictogramAPI.Exceptions;
using PictogramAPI.Services.DTO;
using PictogramAPI.Services.Interfaces;

namespace PictogramAPI.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            app.MapPost("/users", async (IUserService userService,[FromBody] CreateUserDTO userDTO) =>
            {
                try
                {
                    await userService.CreateUser(userDTO);
                    return Results.Created();
                }
                catch (UserExistsException e)
                {
                    return Results.Conflict(new { message = e.Message });
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("Users")
            .WithName("CreateUser")
            .WithSummary("Create a new user in the system.");
        }
    }
}

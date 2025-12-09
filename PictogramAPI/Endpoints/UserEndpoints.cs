using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using PictogramAPI.Domain;
using PictogramAPI.Exceptions;
using PictogramAPI.Services;
using PictogramAPI.Services.DTOCollection.UserDTOs;
using PictogramAPI.Services.Interfaces;
using System.Security.Claims;

namespace PictogramAPI.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app, string authscheme)
        {
            app.MapPost("/users/create", async (IUserService userService, [FromBody] CreateUserDTO userDTO) =>
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

            app.MapPost("/users/login", async (IUserService userService, [FromBody] LoginDTO loginDTO, HttpContext ctx) =>
            {
                try
                {
                    Lazy<Task<UserDisplayInfoDTO>> lazyUserLogin = userService.LoginUser(loginDTO.Email, loginDTO.Password);
                    if (lazyUserLogin == null)
                    {
                        return Results.Unauthorized();
                    }

                    var claims = new List<Claim>
                    {
                        new Claim("user_id", (await lazyUserLogin.Value).Id),
                        new Claim(ClaimTypes.Name, (await lazyUserLogin.Value).Name),
                        new Claim(ClaimTypes.Email, (await lazyUserLogin.Value).Email),
                        new Claim(ClaimTypes.Role, (await lazyUserLogin.Value).Role)
                    };

                    ClaimsIdentity identity = new(claims, authscheme);
                    ClaimsPrincipal userIdentity = new ClaimsPrincipal(identity);

                    await ctx.SignInAsync(authscheme, userIdentity);
                    return Results.Ok(await lazyUserLogin.Value);
                }
                catch (InvalidCredentialsException e)
                {
                    return Results.Unauthorized();
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("Users")
            .WithName("LoginUser")
            .WithSummary("Login a user with email and password.")
            .AllowAnonymous();

            app.MapMethods("/users/logout", new[] { "POST", "OPTIONS" }, async (HttpContext ctx) =>
            {
                if (ctx.Request.Method == HttpMethods.Options)
                {
                    Console.WriteLine(HttpMethod.Options);
                    return Results.Ok();
                }    
                    

                await ctx.SignOutAsync(authscheme);
                return Results.Ok("Logout success");
            })
            .WithTags("Users")
            .WithName("LogoutUser")
            .WithSummary("Logout the current user.")
            .RequireAuthorization();

            app.MapGet("/users/getusers", async (IUserService userService) =>
            {
                try
                {
                    Lazy<Task<List<UserDisplayInfoDTO>>> lazyUsers = userService.GetAllUsers();
                    return Results.Ok(await lazyUsers.Value);
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("Users")
            .WithName("GetAllUsers")
            .WithSummary("Get a list of all users in the system.");

            app.MapDelete("/users/delete/{userId}", async (IUserService userService, IPictogramService pictogramService, IDailyScheduleService dailyScheduleService, string userId) =>
            {
                try
                {
                    List<Pictogram> pictograms = await pictogramService.GetAllPictogramsByUserId(userId);
                    pictograms.RemoveAll(p => p.IsPrivate == false);
                    foreach (var pictogram in pictograms)
                    {
                        await dailyScheduleService.DeleteDailyScheduleTaskByPictogramId(pictogram.PictogramId);
                    }
                    await dailyScheduleService.DeleteDailyScheduleTasksByUserId(userId);
                    await pictogramService.DeleteUsersPrivatePictogramsByUserId(userId);
                    await userService.DeleteUserById(userId);
                    return Results.Ok();
                }
                catch (Exception e)
                {
                    return Results.Problem(detail: e.Message);
                }
            })
            .WithTags("Users")
            .WithName("DeleteUser")
            .WithSummary("Delete user with given id");
        }
    }
}

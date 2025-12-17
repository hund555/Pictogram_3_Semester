
using Microsoft.AspNetCore.Hosting;
using PictogramAPI.Endpoints;
using PictogramAPI.Services;
using PictogramAPI.Services.Interfaces;

namespace PictogramAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IPictogramService, PictogramService>();
            builder.Services.AddScoped<IDailyScheduleService, DailyScheduleService>();

            //Authentication settings
            const string authScheme = "AuthCookie";

            builder.Services.AddAuthentication(authScheme).AddCookie(authScheme, options =>
            {
                options.Cookie.SameSite = SameSiteMode.Lax; 
                options.Cookie.SecurePolicy = CookieSecurePolicy.None; // set to always in production
                options.Cookie.HttpOnly = true; 

                options.Cookie.Name = "AuthCookie";
                options.LoginPath = "/users/login";
                options.AccessDeniedPath = "/users/denied";
                options.SlidingExpiration = true;
                options.ExpireTimeSpan = TimeSpan.FromHours(1);
            });

            builder.Services.AddAuthorization(builder =>
            {
                builder.AddPolicy("User", policy =>
                {
                    policy.RequireAuthenticatedUser()
                    .AddAuthenticationSchemes(authScheme)
                    .AddRequirements()
                    .RequireRole("User");
                });

                builder.AddPolicy("Admin", policy =>
                {
                    policy.RequireAuthenticatedUser()
                    .AddAuthenticationSchemes(authScheme)
                    .AddRequirements()
                    .RequireRole("Admin");
                });
            });

            // Configure DatabaseInfo from appsettings.json
            builder.Services.Configure<DatabaseInfo>(builder.Configuration.GetSection("DatabaseSettings"));

            // Configure CORS
            const string myCors = "client";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(myCors, policy =>
                {
                    policy.WithOrigins("http://localhost:49732") // React dev server
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            // Add services to the container.

            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            app.UseCors(myCors);

            app.MapMethods("{*path}", new[] { "OPTIONS" }, () => Results.Ok())
              .AllowAnonymous();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", app.Environment.ApplicationName);
            });

             
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapUserEndpoints(authScheme);
            app.MapPictogramEndpoints();
            app.MapDailyScheduleEndpoints();

            app.Run();
        }
    }
}

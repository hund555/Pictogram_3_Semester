
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

            // Configure Antiforgery
            builder.Services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-XSRF-TOKEN";
            });

            //Auth settings
            const string authScheme = "AuthCookie";

            builder.Services.AddAuthentication(authScheme).AddCookie(authScheme, options =>
            {
                options.Cookie.SameSite = SameSiteMode.None; 
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // set to always in production
                options.Cookie.HttpOnly = true; 

                options.Cookie.Name = "AuthCookie";
                options.LoginPath = "/users/login";
                options.AccessDeniedPath = "/users/denied";
                options.SlidingExpiration = true;
                options.ExpireTimeSpan = TimeSpan.FromHours(1);
            });

            builder.Services.AddAuthorization(builder =>
            {
                builder.AddPolicy("user", policy =>
                {
                    policy.RequireAuthenticatedUser()
                    .AddAuthenticationSchemes(authScheme)
                    .AddRequirements()
                    .RequireClaim("user_type", "User");
                });

                builder.AddPolicy("admin", policy =>
                {
                    policy.RequireAuthenticatedUser()
                    .AddAuthenticationSchemes(authScheme)
                    .AddRequirements()
                    .RequireClaim("user_type", "Admin");
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

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", app.Environment.ApplicationName);
            });

            app.UseHttpsRedirection();

            

            app.UseCors(myCors);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseAntiforgery();


            app.MapUserEndpoints(authScheme);
            app.MapPictogramEndpoints();
            app.MapDailyScheduleEndpoints();

            app.Run();
        }
    }
}

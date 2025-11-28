
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

            // Configure DatabaseInfo from appsettings.json
            builder.Services.Configure<DatabaseInfo>(builder.Configuration.GetSection("DatabaseSettings"));

            // Configure CORS
            const string myCors = "client";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(myCors, policy =>
                {
                    policy.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            // Add services to the container.
            builder.Services.AddAuthorization();

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

            app.UseAuthorization();

            app.MapUserEndpoints();
            app.MapPictogramEndpoints();
            app.MapDailyScheduleEndpoints();

            app.Run();
        }
    }
}

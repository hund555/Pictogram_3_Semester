using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection;
using PictogramAPI.Services.Interfaces;

namespace PictogramAPI.Services
{
    public class DailyScheduleService
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<DailyScheduleTask> _dailySchedulesCollection;
        private readonly IUserService _userService;

        public DailyScheduleService(IOptions<DatabaseInfo> options, IUserService userService)
        {
            this._userService = userService;
            MongoClient mongoClient = new MongoClient(options.Value.ConnectionString);
            _database = mongoClient.GetDatabase(options.Value.DatabaseName);
            _dailySchedulesCollection = _database.GetCollection<DailyScheduleTask>(options.Value.DailyScheduleCollectionName);
        }

        public async Task CreateDailyScheduleTask(DailyScheduleTask dailyScheduleTask)
        {
            if (_userService.GetUserDisplayInfoById(dailyScheduleTask.UserId) != null)
            {
                throw new NullReferenceException($"No user found with id: {dailyScheduleTask.UserId}");
            }
            await _dailySchedulesCollection.InsertOneAsync(dailyScheduleTask);
        }
    }
}

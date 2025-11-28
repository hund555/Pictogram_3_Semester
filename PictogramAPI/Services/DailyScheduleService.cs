using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection;
using PictogramAPI.Services.Interfaces;
using PictogramAPI.Services.MapDailyTaskDTOCollection;

namespace PictogramAPI.Services
{
    public class DailyScheduleService : IDailyScheduleService
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<DailyScheduleTask> _dailySchedulesCollection;
        private readonly IUserService _userService;
        private readonly IPictogramService _pictogramService;

        public DailyScheduleService(IOptions<DatabaseInfo> options, IUserService userService, IPictogramService pictogramService)
        {
            this._userService = userService;
            this._pictogramService = pictogramService;
            MongoClient mongoClient = new MongoClient(options.Value.ConnectionString);
            _database = mongoClient.GetDatabase(options.Value.DatabaseName);
            _dailySchedulesCollection = _database.GetCollection<DailyScheduleTask>(options.Value.DailyScheduleCollectionName);
        }

        public async Task CreateDailyScheduleTask(CreateDailyTaskDTO dailyTaskDTO)
        {
            if (_userService.GetUserDisplayInfoById(dailyTaskDTO.UserId) == null)
            {
                throw new NullReferenceException($"No user found with id: {dailyTaskDTO.UserId}");
            }
            if (_pictogramService.GetPictogramById(dailyTaskDTO.PictogramId, dailyTaskDTO.UserId) == null)
            {
                throw new NullReferenceException($"No pictogram found with id: {dailyTaskDTO.PictogramId}");
            }

            await _dailySchedulesCollection.InsertOneAsync(dailyTaskDTO.MapCreateDailyTaskDTOToDomainDailyScheduleTask());
        }
    }
}

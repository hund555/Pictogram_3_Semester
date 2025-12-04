using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection.DailyScheduleDTOs;
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
            MongoClient mongoClient = new MongoClient(options.Value.ConnectionString);
            _database = mongoClient.GetDatabase(options.Value.DatabaseName);
            _dailySchedulesCollection = _database.GetCollection<DailyScheduleTask>(options.Value.DailyScheduleCollectionName);
        }

        /// <summary>
        /// creates a new daily schedule task in the database.
        /// </summary>
        /// <param name="dailyTaskDTO"></param>
        /// <returns></returns>
        /// <exception cref="NullReferenceException"></exception>
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

        public Task<DisplayDayScheduleDTO> GetDayScheduleByUserIdAndDay(string userId, string day)
        {
            var filter = Builders<DailyScheduleTask>.Filter.Eq("UserId", userId) & Builders<DailyScheduleTask>.Filter.Eq("Day", day);
            List<DailyScheduleTask> dailyTasks = _dailySchedulesCollection.Find(filter).ToList();

            DisplayDayScheduleDTO displayDayScheduleDTO = new DisplayDayScheduleDTO
            {
                Day = day,
                Tasks = new List<DisplayTaskDTO>()
            };
            foreach (var task in dailyTasks)
            {
                Pictogram pictogram = _pictogramService.GetPictogramById(task.PictogramId, userId).Result;
                DisplayTaskDTO displayTaskDTO = task.MapDomainDailyScheduleTaskToDisplayTaskDTO(pictogram);
                displayDayScheduleDTO.Tasks.Add(displayTaskDTO);
            }

            return Task.FromResult(displayDayScheduleDTO);
        }

        /// <summary>
        /// Deletes daily schedule tasks associated with the specified pictogram ID.
        /// </summary>
        /// <param name="pictogramId"></param>
        /// <returns></returns>
        public async Task DeleteDailyScheduleTaskByPictogramId(string pictogramId)
        {
            await _dailySchedulesCollection.DeleteManyAsync(task => task.PictogramId == pictogramId);
        }

        /// <summary>
        /// Deletes daily schedule tasks associated with the specified user ID.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task DeleteDailyScheduleTasksByUserId(string userId)
        {
            await _dailySchedulesCollection.DeleteManyAsync(task => task.UserId == userId);
        }
    }
}

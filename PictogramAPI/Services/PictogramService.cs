using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection.PictogramDTOs;
using PictogramAPI.Services.Interfaces;
using PictogramAPI.Services.MapPictogramDTOCollection;

namespace PictogramAPI.Services
{
    public class PictogramService : IPictogramService
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<Pictogram> _pictogramsCollection;
        private readonly IUserService _userService;
        private readonly IDailyScheduleService _dailyScheduleService;

        public PictogramService(IOptions<DatabaseInfo> options, IUserService userService, IDailyScheduleService dailyScheduleService)
        {
            this._userService = userService;
            this._dailyScheduleService = dailyScheduleService;
            MongoClient mongoClient = new MongoClient(options.Value.ConnectionString);
            _database = mongoClient.GetDatabase(options.Value.DatabaseName);
            _pictogramsCollection = _database.GetCollection<Pictogram>(options.Value.PictogramCollectionName);
        }

        /// <summary>
        /// Creates a new pictogram in the database.
        /// </summary>
        /// <param name="createPictogramDTO"></param>
        /// <returns></returns>
        /// <exception cref="NullReferenceException"></exception>
        public async Task CreatePictogram(CreatePictogramDTO createPictogramDTO)
        {
            if (await _userService.GetUserDisplayInfoById(createPictogramDTO.UserId) == null)
            {
                throw new NullReferenceException($"No user found with id: {createPictogramDTO.UserId}");
            }

            byte[] imageData;
            imageData = Convert.FromBase64String(createPictogramDTO.Picture);
            //using (var memoryStream = new MemoryStream())
            //{
            //    await createPictogramDTO.Picture.CopyToAsync(memoryStream);
            //    imageData = memoryStream.ToArray();
            //}

            Pictogram pictogram = createPictogramDTO.MapCreatePictogramDTOToPictogramDomain(imageData);
            await _pictogramsCollection.InsertOneAsync(pictogram);
        }

        /// <summary>
        /// Retrieves a pictogram by its unique identifier.
        /// </summary>
        /// <remarks>If the pictogram is marked as private, it will only be returned if the <paramref
        /// name="userId"/> matches the owner of the pictogram.</remarks>
        /// <param name="pictogramId">The unique identifier of the pictogram to retrieve. Cannot be <see langword="null"/> or empty.</param>
        /// <param name="userId">The unique identifier of the user making the request. Used to determine access permissions for private
        /// pictograms.</param>
        /// <returns>The <see cref="Pictogram"/> object corresponding to the specified <paramref name="pictogramId"/> if found
        /// and accessible to the user; otherwise, <see langword="null"/> if the pictogram is private and the user does
        /// not have access.</returns>
        /// <exception cref="NullReferenceException">Thrown if no pictogram exists with the specified <paramref name="pictogramId"/>.</exception>
        public async Task<Pictogram> GetPictogramById(string pictogramId, string userId)
        {
            Pictogram pictogram = await _pictogramsCollection.Find(pictogram => pictogram.PictogramId == pictogramId).FirstOrDefaultAsync();

            if (pictogram == null)
            {
                throw new NullReferenceException($"No pictogram found with id: {pictogramId}");
            }
            else if (await _userService.GetUserDisplayInfoById(userId) == null)
            {
                if (pictogram.IsPrivate && pictogram.UserId != userId)
                {
                    pictogram = null;
                }
            }

            return pictogram;
        }

        /// <summary>
        /// Deletes all private pictograms associated with the specified user ID.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task DeleteUsersPrivatePictogramsByUserId(string userId)
        {
            List<Pictogram> userPictograms = await _pictogramsCollection.Find(pictogram => pictogram.UserId == userId && pictogram.IsPrivate).ToListAsync();
            foreach (var pictogram in userPictograms)
            {
                await _dailyScheduleService.DeleteDailyScheduleTaskByPictogramId(pictogram.PictogramId);
            }
            await _pictogramsCollection.DeleteManyAsync(pictogram => pictogram.UserId == userId && pictogram.IsPrivate);
        }
    }
}

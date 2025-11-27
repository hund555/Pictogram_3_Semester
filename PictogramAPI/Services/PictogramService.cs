using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using PictogramAPI.Domain;
using PictogramAPI.Services.DTOCollection;
using PictogramAPI.Services.Interfaces;
using PictogramAPI.Services.MapPictogramDTOCollection;

namespace PictogramAPI.Services
{
    public class PictogramService
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<Pictogram> _pictogramsCollection;

        public PictogramService(IOptions<DatabaseInfo> options)
        {
            MongoClient mongoClient = new MongoClient(options.Value.ConnectionString);
            _database = mongoClient.GetDatabase(options.Value.DatabaseName);
            _pictogramsCollection = _database.GetCollection<Pictogram>(options.Value.PictogramCollectionName);
        }

        public async Task CreatePictogram(IUserService userService, CreatePictogramDTO createPictogramDTO, string userId, byte[] picture)
        {
            if (await userService.GetUserById(userId) == null)
            {
                throw new Exception("User not found.");
            }

            IGridFSBucket gridFSBucket = new GridFSBucket(_database, new GridFSBucketOptions() { BucketName = "pictures" });
            ObjectId gridFsId = await gridFSBucket.UploadFromBytesAsync(createPictogramDTO.Title, picture);

            Pictogram pictogram = createPictogramDTO.MapCreatePictogramDTOToPictogramDomain(userId, gridFsId);
            await _pictogramsCollection.InsertOneAsync(pictogram);
        }
    }
}

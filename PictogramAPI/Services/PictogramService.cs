using Microsoft.AspNetCore.Http;
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
    public class PictogramService : IPictogramService
    {
        const string GRID_FS_BUCKET_NAME = "pictures";

        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<Pictogram> _pictogramsCollection;
        private readonly IUserService _userService;

        public PictogramService(IOptions<DatabaseInfo> options, IUserService userService)
        {
            this._userService = userService;
            MongoClient mongoClient = new MongoClient(options.Value.ConnectionString);
            _database = mongoClient.GetDatabase(options.Value.DatabaseName);
            _pictogramsCollection = _database.GetCollection<Pictogram>(options.Value.PictogramCollectionName);
        }

        public async Task CreatePictogram(CreatePictogramDTO createPictogramDTO)
        {
            if (await _userService.GetUserDisplayInfoById(createPictogramDTO.UserId) == null)
            {
                throw new NullReferenceException($"No user found with id: {createPictogramDTO.UserId}");
            }

            IGridFSBucket gridFSBucket = new GridFSBucket(_database, new GridFSBucketOptions() { BucketName = GRID_FS_BUCKET_NAME });

            // thise two lines where found on stack overflow https://stackoverflow.com/questions/36432028/how-to-convert-a-file-into-byte-array-in-memory
            // They convert the IFormFile to a byte array to be stored in MongoDB GridFS
            await using var memoryStream = new MemoryStream();
            await createPictogramDTO.Picture.CopyToAsync(memoryStream);

            ObjectId gridFsId = await gridFSBucket.UploadFromBytesAsync(createPictogramDTO.Title, memoryStream.ToArray());

            Pictogram pictogram = createPictogramDTO.MapCreatePictogramDTOToPictogramDomain(gridFsId);
            await _pictogramsCollection.InsertOneAsync(pictogram);
        }
    }
}

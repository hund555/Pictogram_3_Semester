using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PictogramAPI.Domain;

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

        public async Task CreatePictogram()
        {

        }
    }
}

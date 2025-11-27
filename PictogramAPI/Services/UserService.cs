using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PictogramAPI.Domain;
using PictogramAPI.Exceptions;
using PictogramAPI.Services.DTO;
using PictogramAPI.Services.Interfaces;
using PictogramAPI.Services.MapUserDTOCollection;
using System.Text;

namespace PictogramAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoDatabase _mongodb;
        private readonly IMongoCollection<User> _usersCollection;
        public UserService(IOptions<DatabaseInfo> options)
        {
            // Initialize MongoDB client and get the database and user collection
            MongoClient mongoClient = new MongoClient(options.Value.ConnectionString);
            _mongodb = mongoClient.GetDatabase(options.Value.DatabaseName);
            _usersCollection = _mongodb.GetCollection<User>(options.Value.UserCollectionName);
        }

        public async Task CreateUser(CreateUserDTO userDTO)
        {
            User existingUser = await _usersCollection.Find(user => user.Email == userDTO.Email).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                throw new UserExistsException("User with the provided email already exists.");
            }

            string salt = Util.Cryptography.GenerateSalt();
            string hashedPassword = Util.Cryptography.CreateHashedPassword(Encoding.UTF8.GetBytes(userDTO.Password), Convert.FromBase64String(salt));

            await _usersCollection.InsertOneAsync(userDTO.MapCreateUserDTOToUserDomain(salt, hashedPassword));
        }
    }
}

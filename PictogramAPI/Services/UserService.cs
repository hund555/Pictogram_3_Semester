using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PictogramAPI.Domain;
using PictogramAPI.Exceptions;
using PictogramAPI.Services.DTOCollection.UserDTOs;
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

        /// <summary>
        /// Get user display info by user id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<UserDisplayInfoDTO> GetUserDisplayInfoById(string id)
        {
            User user = await _usersCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
            if (user == null)
            {
                return null;
            }
            return user.MapUserDomainToUserDisplayInfoDTO();
        }

        /// <summary>
        /// create a new user in the system
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        /// <exception cref="UserExistsException"></exception>
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

        /// <summary>
        /// Check user credentials and return user info if valid
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        /// <exception cref="InvalidCredentialsException"></exception>
        public Lazy<Task<UserDisplayInfoDTO>> LoginUser(string email, string password)
        {
            return new Lazy<Task<UserDisplayInfoDTO>>(async () =>
            {
                User user = await _usersCollection.Find(user => user.Email == email).FirstOrDefaultAsync();
                if (user == null)
                {
                    throw new InvalidCredentialsException("Invalid email or password.");
                }
                string hashedPassword = Util.Cryptography.CreateHashedPassword(Encoding.UTF8.GetBytes(password), Convert.FromBase64String(user.Salt));
                if (hashedPassword != user.PasswordHash)
                {
                    throw new InvalidCredentialsException("Invalid email or password.");
                }
                return user.MapUserDomainToUserDisplayInfoDTO();
            });
        }
    }
}

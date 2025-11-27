using PictogramAPI.Domain;

namespace PictogramAPI.Services.MapUserDTOCollection
{
    public static class MapUserDTO
    {
        /// <summary>
        /// map CreateUserDTO to User domain object with provided salt and hashed password
        /// </summary>
        /// <param name="userDTO"></param>
        /// <param name="salt"></param>
        /// <param name="hashedPassword"></param>
        /// <returns></returns>
        public static User MapCreateUserDTOToUserDomain(this DTO.CreateUserDTO userDTO, string salt, string hashedPassword)
        {
            return new User
            {
                Id = Guid.NewGuid().ToString(),
                Name = userDTO.Name,
                Email = userDTO.Email,
                Role = "User",
                Salt = salt,
                PasswordHash = hashedPassword
            };
        }
    }
}

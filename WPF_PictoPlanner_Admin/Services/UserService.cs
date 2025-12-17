using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using WPF_PictoPlanner_Admin.Models;
using WPF_PictoPlanner_Admin.Services.Interfaces;

namespace WPF_PictoPlanner_Admin.Services
{
    /// <summary>
    /// Service Class to handle API-requests 
    /// </summary>
    public class UserService : IUserService
    {
        private HttpClient _httpClient;
        private CookieContainer _cookieContainer;
        const string baseURL = "http://10.176.160.96:8080";

        public UserService()
        {
            _cookieContainer = new CookieContainer();

            //sets cookiecantiner for httphandler for httpclient
            var handler = new HttpClientHandler
            {
                CookieContainer = _cookieContainer,
                UseCookies = true,
                AllowAutoRedirect = true
            };
            _httpClient = new HttpClient(handler)
            {
                BaseAddress = new Uri(baseURL)
            };
        }

        /// <summary>
        /// Sends Get-request to API to fetch all users from MongoDB
        /// </summary>
        /// <returns> A list of user objects </returns>
        public async Task<ICollection<User>> GetAllUsersAsync()
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/users/getusers");

            response.EnsureSuccessStatusCode();

            string json = await response.Content.ReadAsStringAsync();

            List<User> userList = new List<User>();

            userList = JsonConvert.DeserializeObject<List<User>>(json);

            return userList;
        }

        /// <summary>
        /// Asynchronously deletes the user with the specified identifier.
        /// </summary>
        /// <param name="userId">The unique identifier of the user to delete. Cannot be <see langword="null"/> or empty.</param>
        /// <returns>A task that represents the asynchronous delete operation.</returns>
        public async Task DeleteUserByIdAsync(string userId)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync($"/users/delete/{userId}");
            response.EnsureSuccessStatusCode();
        }

        /// <summary>
        /// Updates the role of a specified user asynchronously.
        /// </summary>
        /// <remarks>This method sends an HTTP PUT request to update the user's role. The operation
        /// completes when the server responds with a successful status code.</remarks>
        /// <param name="userId">The unique identifier of the user whose role is to be updated. Cannot be <see langword="null"/> or empty.</param>
        /// <param name="newRole">The name of the new role to assign to the user. Cannot be <see langword="null"/> or empty.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        public async Task UpdateUserRoleAsync(string userId, string newRole)
        {
            var content = new StringContent(JsonConvert.SerializeObject(new { Id = userId, Role = newRole }), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PutAsync("/users/updateRole", content);
            response.EnsureSuccessStatusCode();
        }

        /// <summary>
        /// Authenticates a user using the specified login credentials.
        /// </summary>
        /// <remarks>This method sends the login credentials to the authentication service and returns the
        /// corresponding user information if authentication is successful.</remarks>
        /// <param name="login">An object containing the user's login credentials. Cannot be <c>null</c>.</param>
        /// <returns>A <see cref="User"/> object representing the authenticated user if the credentials are valid; otherwise,
        /// <c>null</c>.</returns>
        public async Task<User?> Login(Login login)
        {
            var data = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");


            HttpResponseMessage response = await _httpClient.PostAsync("/users/login", data);
            response.EnsureSuccessStatusCode();

            string json = await response.Content.ReadAsStringAsync();
            User? user = JsonConvert.DeserializeObject<User>(json);
            return user;
        }

        /// <summary>
        /// Logs out the current user by invalidating the server session and clearing local authentication cookies.
        /// </summary>
        /// <remarks>After calling this method, the user will be signed out and must authenticate again to
        /// access protected resources.</remarks>
        /// <returns>A task that represents the asynchronous logout operation.</returns>
        public async Task Logout()
        {
            HttpResponseMessage response = await _httpClient.PostAsync("/users/logout", null);
            response.EnsureSuccessStatusCode();

            // Clear cookies locally
            _cookieContainer = new CookieContainer();
        }
    }
}

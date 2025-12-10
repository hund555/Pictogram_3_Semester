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
        const string baseURL = "http://10.176.160.117:8080";

        public UserService()
        {
            _cookieContainer = new CookieContainer();

            var handler = new HttpClientHandler
            {
                CookieContainer = _cookieContainer,
                UseCookies = true,
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

        public async Task DeleteUserByIdAsync(string userId)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync($"/users/delete/{userId}");
            response.EnsureSuccessStatusCode();
        }

        public async Task UpdateUserRoleAsync(string userId, string newRole)
        {
            var content = new StringContent(JsonConvert.SerializeObject(new { Id = userId, Role = newRole }), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PutAsync("/users/updateRole", content);
            response.EnsureSuccessStatusCode();
        }

        public async Task<User?> Login(Login login)
        {
            var data = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");


            HttpResponseMessage response = await _httpClient.PostAsync("/users/login", data);
            response.EnsureSuccessStatusCode();

            string json = await response.Content.ReadAsStringAsync();
            User? user = JsonConvert.DeserializeObject<User>(json);
            return user;
        }

        public async Task Logout()
        {
            HttpResponseMessage response = await _httpClient.PostAsync("/users/logout", null);
            response.EnsureSuccessStatusCode();

            // Clear cookies locally
            _cookieContainer = new CookieContainer();
        }
    }
}

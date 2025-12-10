using System.Net.Http;
using Newtonsoft.Json;
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
        const string baseURL = "http://10.176.160.117:8080";

        public UserService()
        {
            _httpClient = new HttpClient();
        }

        /// <summary>
        /// Sends Get-request to API to fetch all users from MongoDB
        /// </summary>
        /// <returns> A list of user objects </returns>
        public async Task<ICollection<User>> GetAllUsersAsync()
        {
            var url = new Uri(baseURL + "/users/getusers");

            HttpResponseMessage response = await _httpClient.GetAsync(url);

            response.EnsureSuccessStatusCode();

            string json = await response.Content.ReadAsStringAsync();

            List<User> userList = new List<User>();

            userList = JsonConvert.DeserializeObject<List<User>>(json);

            return userList;
        }

        public async Task DeleteUserByIdAsync(string userId)
        {
            var url = new Uri(baseURL + $"/users/delete/{userId}");
            HttpResponseMessage response = await _httpClient.DeleteAsync(url);
            response.EnsureSuccessStatusCode();
        }

        public async Task UpdateUserRoleAsync(string userId, string newRole)
        {
            var url = new Uri(baseURL + $"/users/updateRole");
            var content = new StringContent(JsonConvert.SerializeObject(new { Id = userId, Role = newRole }), System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PutAsync(url, content);
            response.EnsureSuccessStatusCode();
        }
    }
}

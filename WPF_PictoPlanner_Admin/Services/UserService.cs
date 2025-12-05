using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
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
        const string baseURL = "http://10.176.160.133:8080";

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
            json = json.Split('[')[1];
            json = json.Split(']')[0];
            json = "[" + json + "]";
            json = json.Replace(@"\", "");
            List<User> userList = new List<User>();

            userList = JsonSerializer.Deserialize<List<User>>(json);

            return userList;
        }
    }
}

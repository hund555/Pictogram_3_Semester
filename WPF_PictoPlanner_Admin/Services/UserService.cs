using System.Net.Http;
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
        const string baseURL = "http://10.176.160.150:8080";

        public UserService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<ICollection<User>> GetAllUsersAsync()
        {
            var url = new Uri(baseURL + "/users/getusers");

            HttpResponseMessage

        }
    }
}

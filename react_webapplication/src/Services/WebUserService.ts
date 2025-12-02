import type CreateUserWeb from "../Domain/UserWeb";
import axios, { type AxiosResponse } from "axios";
import type UserDisplayInfo from "../Domain/UserDisplayInfo";

const baseURL = "http://10.176.160.150:8080";
// Service class to handle API-requests from the users
class WebUserService {
    // Creates a new user in the system
    static async createUser(name: string, email: string, password: string): Promise<CreateUserWeb> {
        const payload = { name, email, password };

        return axios.post(baseURL + "/users", payload).then((response: AxiosResponse<CreateUserWeb>) => response.data);
    }

    static async login(email: string, password: string): Promise<UserDisplayInfo>
    {
        const payload = {email, password };

        return axios.post<UserDisplayInfo>(baseURL + "/users/login", payload)
        .then((response: AxiosResponse<UserDisplayInfo>) => response.data);
    }
}
export default WebUserService;
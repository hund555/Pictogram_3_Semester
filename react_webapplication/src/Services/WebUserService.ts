import type CreateUserWeb from "../Domain/UserWeb";
import axios, { type AxiosResponse } from "axios";

class WebUserService {
    

    // Creates a new user in the system
    static async createUser(name: string, email: string, password: string): Promise<CreateUserWeb> {
        const baseURL = "http://10.176.160.103:8080";
        const payload = { name, email, password };

        return axios.post(baseURL + "/users", payload).then((response: AxiosResponse<CreateUserWeb>) => response.data);
    }
}
export default WebUserService;
import type CreateUserWeb from "../Domain/CreateUserWeb";
import axios, { type AxiosResponse } from "axios";

class WebUserService {
    

    // Creates a new user in the system
    static async createUser(email: string, fullName: string, password: string): Promise<CreateUserWeb> {
        const baseURL = "http://localhost:8080";
        const payload = { email, fullName, password };

        return axios.post(baseURL + "/users", payload).then((response: AxiosResponse<CreateUserWeb>) => response.data);
    }
}
export default WebUserService;
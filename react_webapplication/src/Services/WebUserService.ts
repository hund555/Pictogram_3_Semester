import type CreateUserWeb from "../Domain/UserWeb";
import axios, { type AxiosResponse } from "axios";
import type UserDisplayInfo from "../Domain/UserDisplayInfo";
import Environment from "../Utillity";

const baseURL = Environment.getBackendAddress();
// Service class to handle API-requests from the users
class WebUserService {
    // Creates a new user in the system
    static async createUser(name: string, email: string, password: string): Promise<CreateUserWeb> {
        const payload = { name, email, password };

        return axios.post(baseURL + "/users/create", payload).then((response: AxiosResponse<CreateUserWeb>) => response.data);
    }

    static async login(email: string, password: string): Promise<UserDisplayInfo>
    {
        const payload = {email, password };

        return axios.post<UserDisplayInfo>(baseURL + "/users/login", payload, {withCredentials: true})
        .then((response: AxiosResponse<UserDisplayInfo>) => response.data);
    }

    static async logout(): Promise<void> {
        try {
            const response = await fetch(baseURL + "/users/logout", {
                credentials: "include", // send cookies
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({}) // empty body, optional
            });

            if (!response.ok) {
                throw new Error(`Logout failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.text(); // or response.json() if your API returns JSON
            console.log("Logout success:", data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    //static async logout(): Promise<void>
    //{
    //    return axios.post<void>(baseURL + "/users/logout",
    //        {
                
    //            withCredentials: true,
    //            Credentials: 'include'
    //        })
    //        .then((response: AxiosResponse<void>) =>
    //        {
    //            response.data
    //            console.log(response.data)
    //        });
    //}
}
export default WebUserService;
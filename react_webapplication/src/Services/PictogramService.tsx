import type Pictogram from "../Domain/Pictogram";
import type AllPictograms from "../Domain/AllPictograms";
import axios, { type AxiosResponse } from 'axios';
import Environment from "../Utillity";

const baseurl = Environment.getBackendAddress();

/* 
* A Service-class to handle HTTP-calls to the Pictogram-API
*/
class PictogramService
{
    // // Sends a request to the backend-API to create a new pictogram in the system
    static async createPictogram(title: string, description: string, fileType: string, isPrivate: boolean, picture: string): Promise<Pictogram>
    {
        const userId = localStorage.getItem("loggedInUserId");
        const payload = { title, description, fileType, isPrivate, picture, userId};
        
        return axios.post<Pictogram>(baseurl + "/pictograms/create", payload, {withCredentials: true})
        .then((response: AxiosResponse<Pictogram>) => response.data)
    } 

    // Sends a request to the backend-API to display all public pictograms and private pictograms for the logged-in user
    static async displayAllPictograms() : Promise<AllPictograms[]>
    {
        return axios.get<AllPictograms[]>(baseurl + '/pictograms/getAllPictograms', { withCredentials: true })
            .then((response: AxiosResponse<AllPictograms[]>) => response.data)
    }

    // Sends a request to the backend-API to update a pictogram
    static async updatePictogram(pictogramId: string, title: string, description: string, picture: string, fileType: string, userId: string, isPrivate:boolean ) {
        const payload = {
            pictogramId, title,description,picture,fileType,userId, isPrivate
        }

        return axios.post(baseurl +"/pictograms/update", payload, { withCredentials: true })
    }

    // Sends a request to the backend-API to delete a pictogram
    static async deletePictogram(pictogramId: string) {
        return axios.delete(baseurl + "/pictograms/delete/" + pictogramId, { withCredentials: true })
    }
}
export default PictogramService;
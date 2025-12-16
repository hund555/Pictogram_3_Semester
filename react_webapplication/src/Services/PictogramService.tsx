import type Pictogram from "../Domain/Pictogram";
import type AllPictograms from "../Domain/AllPictograms";
import axios, { type AxiosResponse } from 'axios';
import Environment from "../Utillity";

const baseurl = Environment.getBackendAddress();
class PictogramService
{
    static async createPictogram(title: string, description: string, fileType: string, isPrivate: boolean, picture: string): Promise<Pictogram>
    { 
       
    
        const userId = localStorage.getItem("loggedInUserId");
        const payload = { title, description, fileType, isPrivate, picture, userId};

        
        return axios.post<Pictogram>(baseurl + "/pictograms/create", payload, {withCredentials: true})
        .then((response: AxiosResponse<Pictogram>) => response.data)
         
            //.catch(function (error) { console.log(error) })
    } 

    static async displayAllPictograms() : Promise<AllPictograms[]>
    {
        return axios.get<AllPictograms[]>(baseurl + '/pictograms/getAllPictograms', { withCredentials: true })
            .then((response: AxiosResponse<AllPictograms[]>) => response.data)
    }





    static async updatePictogram(pictogramId: string, title: string, description: string, picture: string, fileType: string, userId: string, isPrivate:boolean ) {
        const payload = {
            pictogramId, title,description,picture,fileType,userId, isPrivate
        }

        return axios.post(baseurl +"/pictograms/update", payload, { withCredentials: true })
    }
    static async deletePictogram(pictogramId: string) {
        return axios.delete(baseurl + "/pictograms/delete/" + pictogramId, { withCredentials: true })
    }
}

export default PictogramService;
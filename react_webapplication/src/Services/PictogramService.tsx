import type Pictogram from "../Domain/Pictogram";
import type AllPictograms from "../Domain/AllPictograms";
import axios, { type AxiosResponse } from 'axios';

class PictogramService {
    static async createPictogram(title: string, description:string, fileType:string, isPrivate:boolean, picture: string, userId: string) : Promise<Pictogram> { 
       
    

        const payload = { title, description, fileType, isPrivate, picture, userId};

        console.log(JSON.stringify(picture));
        return axios.post<Pictogram>("http://192.168.50.214:8080/pictograms/create", payload, {withCredentials: true})
        .then((response: AxiosResponse<Pictogram>) => response.data)
         
            //.catch(function (error) { console.log(error) })
    } 

    static async displayAllPictograms(userId:string): Promise<AllPictograms[]>
        {
        return axios
            .get<AllPictograms[]>(`http://192.168.50.214:8080/pictograms/allpictograms/${userId}`,
                { withCredentials: true })
            .then((response: AxiosResponse<AllPictograms[]>) => response.data)
        }

}

export default PictogramService;
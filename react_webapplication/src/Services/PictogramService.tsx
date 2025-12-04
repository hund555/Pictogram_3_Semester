import type Pictogram from "../Domain/Pictogram";
import axios, { type AxiosResponse } from 'axios';

class PictogramService {
    static async createPictogram(title: string, description:string, fileType:string, isPrivate:boolean, picture: string, userId: string ) : Promise<Pictogram> { 
       
    

        const payload = { title, description, fileType, isPrivate, picture, userId };

        console.log(JSON.stringify(picture));
       return axios.post<Pictogram>("http://10.176.160.125:8080/pictograms/create", payload)
        .then((response: AxiosResponse<Pictogram>) => response.data)
         
            //.catch(function (error) { console.log(error) })
    } 
    

}

export default PictogramService;







import type Pictogram from "../Domain/Pictogram";
import type AllPictograms from "../Domain/AllPictograms";
import axios, { type AxiosResponse } from 'axios';

class PictogramService {
    static async createPictogram(title: string, description:string, fileType:string, isPrivate:boolean, picture: string) : Promise<Pictogram> { 
       
    

        const payload = { title, description, fileType, isPrivate, picture};

        console.log(JSON.stringify(picture));
        return axios.post<Pictogram>("http://localhost:5247/pictograms", payload, {withCredentials: true})
        .then((response: AxiosResponse<Pictogram>) => response.data)
         
            //.catch(function (error) { console.log(error) })
    } 

    static async displayAllPictograms() : Promise<AllPictograms[]>
        {
            return axios
                .get<AllPictograms[]>(`http://localhost:5247/pictograms`, { withCredentials: true })
            .then((response: AxiosResponse<AllPictograms[]>) => response.data)
        }

}

export default PictogramService;
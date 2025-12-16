import type Pictogram from "../Domain/Pictogram";
import type AllPictograms from "../Domain/AllPictograms";
import axios, { type AxiosResponse } from 'axios';
import Environment from "../Utillity";

const baseurl = Environment.getBackendAddress();
class PictogramService {
    static async createPictogram(title: string, description:string, fileType:string, isPrivate:boolean, picture: string) : Promise<Pictogram> { 
       
    

        const payload = { title, description, fileType, isPrivate, picture};

        console.log(JSON.stringify(picture));
        return axios.post<Pictogram>("http://localhost:8080/pictograms/create", payload, {withCredentials: true})
        .then((response: AxiosResponse<Pictogram>) => response.data)
         
            //.catch(function (error) { console.log(error) })
    } 

    static async displayAllPictograms() : Promise<AllPictograms[]>
    {
            return axios.get<AllPictograms[]>(`http://localhost:8080/pictograms`, { withCredentials: true })
            .then((response: AxiosResponse<AllPictograms[]>) => response.data)
    }


    static async getAllPictograms(userid: string): Promise<Pictogram[]> {

        return new Promise<Pictogram[]>((resolve, reject) => {
            axios.get<Pictogram[]>(baseurl + "/pictograms", { data: { user_id: userid } })
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        });


    }


    static async updatePictogram(pictogramId: string, title: string, description: string, picture: string, fileType: string, userId: string, isPrivate:boolean ) {
        const payload = {
            pictogramId, title,description,picture,fileType,userId, isPrivate
        }

        return axios.post(baseurl + "/pictograms/update", payload, { withCredentials: true })
    }

}

export default PictogramService;
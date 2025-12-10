import type Pictogram from "../Domain/Pictogram";
import axios, {type AxiosResponse } from 'axios';
import Environment from "../Utillity";
const baseurl = Environment.getBackendAddress();
class PictogramService {
    
    static async createPictogram(title: string, description:string, fileType:string, isPrivate:boolean, picture: string, userId: string ) : Promise<Pictogram> { 
       
    

        const payload = { title, description, fileType, isPrivate, picture, userId };

        console.log(JSON.stringify(picture));
       return axios.post<Pictogram>(baseurl + "/pictograms/create", payload)
        .then((response: AxiosResponse<Pictogram>) => response.data)
         
            //.catch(function (error) { console.log(error) })
    } 
    static async getAllPictograms(userid:string) : Promise<Pictogram[]>{

        return new Promise<Pictogram[]>((resolve, reject) => {
            axios.get<Pictogram[]>(baseurl + "/pictograms/allpictograms", { data: { user_id: userid } })
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        });
            

    }

}

export default PictogramService;







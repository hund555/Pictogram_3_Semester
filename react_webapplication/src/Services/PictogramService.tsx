import type Pictogram from "../Domain/Pictogram";
import axios, {type AxiosResponse } from 'axios';
import Environment from "../Utillity";
import type PictogramDTO from "../Domain/PictogramDTO";
const baseurl = Environment.getBackendAddress();
class PictogramService {
    
    static async createPictogram(title: string, description:string, fileType:string, isPrivate:boolean, picture: string, userId: string ) : Promise<Pictogram> { 
       
    

        const payload = { title, description, fileType, isPrivate, picture, userId };

        console.log(JSON.stringify(payload));
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
    static mapPictogramDTOToDomainPictogram(pictogramDTO:PictogramDTO):Pictogram {
        return {
            pictogramId: pictogramDTO.pictogramId,
            title: pictogramDTO.title,
            description: pictogramDTO.description,
            fileType: pictogramDTO.fileType,
            isPrivate: pictogramDTO.isPrivate,
            picture: pictogramDTO.pictureBytes,
            userId: pictogramDTO.userId
        }




    }

}

export default PictogramService;







import type Pictogram from "../Domain/Pictogram";
import type AllPictograms from "../Domain/AllPictograms";
import axios, { type AxiosResponse } from 'axios';
import Environment from "../Utillity";
import type PictogramDTO from "../Domain/PictogramDTO";
const baseurl = Environment.getBackendAddress();
class PictogramService {
    static async createPictogram(title: string, description:string, fileType:string, isPrivate:boolean, picture: string) : Promise<Pictogram> { 
       
    

        const payload = { title, description, fileType, isPrivate, picture};

        console.log(JSON.stringify(picture));
        return axios.post<Pictogram>("http://localhost:8080/pictograms", payload, {withCredentials: true})
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
            axios.get<Pictogram[]>(baseurl + "/pictograms/allpictograms", { data: { user_id: userid } })
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        });


    }
    static mapPictogramDTOToDomainPictogram(pictogramDTO: PictogramDTO): Pictogram {
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
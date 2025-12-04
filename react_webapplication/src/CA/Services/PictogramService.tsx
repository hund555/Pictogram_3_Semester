import type Pictogram from "../Domain/Pictogram";
import axios from 'axios';

class PictogramService {
    static async createPictogram(pictogram: Pictogram) 
    {

        const formData = new FormData();

        formData.append("Title", pictogram.title);
        formData.append("Description", pictogram.description);
        formData.append("FileType", pictogram.file.name.split('.')[1]);
        formData.append("IsPrivate", String(pictogram.isPrivate)); // must be string
        formData.append("Picture", JSON.stringify(fileToByteArray(pictogram.file)));
        formData.append("UserId", pictogram.userId);

        const response = axios.post("http://10.176.160.124:8080/pictograms", formData)
            .then(function () { console.log(response) })
            .catch(function (error) { console.log(error) })
    }


}

export default PictogramService;


function fileToByteArray(file: File): Promise<Uint8Array> 
{
    return new Promise((resolve, reject) => 
    {

        const reader = new FileReader();


        reader.onload = () => {
            if (reader.result) {
                const arrayBuffer = reader.result as ArrayBuffer;
                resolve(new Uint8Array(arrayBuffer))
            }
            else {
                reject("Failed to read file");
            }

        };
        reader.onerror = (err) => { reject(err) };
        reader.readAsArrayBuffer(file)







    })
}
import Pictogram from "../Domain/Pictogram";
import react from "react";
import axios from 'axios';
export default function createPictogram(title: string, description:string, fileType:string, isPrivate:boolean, picture:File, userId:string) {
    const formData = new FormData();

    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("FileType", picture.name.split('.')[1]);
    formData.append("IsPrivate", String(isPrivate); // must be string
    formData.append("Picture", JSON.stringify(fileToByteArray(picture)));
    formData.append("UserId", userId);

    const response = axios.post("http://10.176.160.124:8080/pictograms", formData)
        .then(function () { console.log(response) })
        .catch(function (error) { console.log(error) })

  

}



}



function fileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {

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
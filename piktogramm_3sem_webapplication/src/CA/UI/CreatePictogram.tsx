/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Pictogram from '../Domain/Pictogram';
import './StyleSheet/UI_Module_Template.css';
import axios from 'axios';


export default function ViewCreatePictogram() {
    //Data
    let [errorMessage, setErrorMessage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [file, setFile] = useState<File>();
    const [descripion, setDescription] = useState<string>("");
    //restrict, what Filetypes can be uploaded by the user;
    const acceptedFileEndingList: String[] = [ ".jpg", ".png", ".svg" ];
    
    //Eventhandler to process fileupload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length !== 0) {
            setFile(e.target.files[0])
            const fileInput = document.getElementById("fileInput") as HTMLInputElement;
            if (fileInput.files != null && fileInput != null) {
                setFile(fileInput.files[0]);
            }
        }
    }

    const handleSubmit = async () => { //handleSubmit
        if (file == null) { setErrorMessage("No File Selected")}
        if (title == "") { setErrorMessage("Title Empty") }
        if (descripion == "") { setErrorMessage("Description empty"); }
        if (title != "" && file != null && descripion != "") {
    
            
                //Create FormData from Object
                const formData = new FormData();

                formData.append("Title", title);
                formData.append("Description", descripion);
                formData.append("FileType", file.name.split('.')[1]);
            formData.append("IsPrivate", "false"); // must be string
            formData.append("Picture", JSON.stringify(fileToByteArray(file)));
                formData.append("UserId", "7423c0e6-fbee-4165-aec2-02dfa60016ea");                
            const response = axios.post("http://10.176.160.124:8080/pictograms", formData)
                    .then(function() { console.log(response) })
                    .catch (function(error) {console.log(error) })



            }
        /*}*/


    }

    const acceptableFileEndings = () => {
        var result:string = "";
        for (var i = 0; i < acceptedFileEndingList.length; i++) {
            result += acceptedFileEndingList[i] + ", "
        }
        return result;
    }





    //HTML
    return (<>

        <div className="module">
            <div ><ImagePreview file={file} /></div>
            <br/>
            <label>
                Title:
                <input type="text" value={title} name="Title" placeholder="Enter your title" onChange={e => setTitle(e.target.value)}></input>
            </label>
            
            <br />
            <label>
                Desc:
                <input type="text" height="200px" width="200px" onChange={e => setDescription(e.target.value)} value={descripion} /></label>
            <br />
            <label>
                File:    
                <input id="fileInput" accept={ acceptableFileEndings()} type="file" onChange={handleFileChange}></input>
            </label> <br />
            <label style={{color:'red', fontWeight:'bold'} }>{errorMessage}</label><br/>
            <button onClick={handleSubmit}>Opret</button>
        </div>




    </>);


}
//Create own property to pass the file;
type ImagePreviewProps = {
    file: File | undefined

}


//Custom Previewer
  const ImagePreview = ({ file }: ImagePreviewProps) => {
    if (!file) { return null };
      return (<img className="imagePreview" style={{ height: 300, width: 300 } } src={URL.createObjectURL(file)} />)

}
function fileToByteArray(file: File) :Promise<Uint8Array> {
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





    //return [];
}

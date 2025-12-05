/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import type Pictogram from '../Domain/Pictogram';
import './StyleSheet/UI_Module_Template.css';
import PictogramService from "../Services/PictogramService";



function CreatePictogram() 
{
    //Data
    let [errorMessage, setErrorMessage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [file, setFile] = useState<File>();
    const [descripion, setDescription] = useState<string>("");
    const [isPrivate, setisPrivate] = useState<boolean>(false)
    //restrict, what Filetypes can be uploaded by the user;
    const acceptedFileEndingList: String[] = [ ".jpg", ".png", ".svg" ];
    
    //Eventhandler to process fileupload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        if (e.target.files && e.target.files.length !== 0) 
        {
            setFile(e.target.files[0])
            const fileInput = document.getElementById("fileInput") as HTMLInputElement;
            if (fileInput.files != null && fileInput != null) 
            {
                setFile(fileInput.files[0]);
            }
        }
    }

    const handleSubmit = async () => { //handleSubmit
        if (file == null) { setErrorMessage("No File Selected"); return; }
        if (title == "") { setErrorMessage("Title Empty"); return; }
       
        const buffer = await file.arrayBuffer();
        const b64 = await fileToBase64(file)
        PictogramService.createPictogram(title, descripion, file.type, isPrivate, b64, "7423c0e6-fbee-4165-aec2-02dfa60016ea");                
                

        


    }
    const acceptableFileEndings = () => {
        var result: string = "";
        for (var i = 0; i < acceptedFileEndingList.length; i++) {
            result += acceptedFileEndingList[i] + ", "
        }
        return result;
    }


        //HTML
        return (

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
                <label>Kun synligt for mig: <input type="checkbox" onChange={() => setisPrivate(!isPrivate) } checked={isPrivate}></input> </label>
            
            <label style={{color:'red', fontWeight:'bold'} }>{errorMessage}</label><br/>
            <button onClick={handleSubmit}>Opret</button>
        </div>
        );

        
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

    

export default CreatePictogram;





//simple file to base64 string converter ==> Used for simple file transfer <==
const fileToBase64 = (file:File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file); //includes data:image/..;base64
        reader.onload = () => {
            const buffer = reader.result as string;
            const clearString = buffer.split(",")[1]; // data:<filetype>;base64, is removed
            resolve(clearString)
        }
        reader.onerror = (error) => reject(error)
        
    })
    
    

}


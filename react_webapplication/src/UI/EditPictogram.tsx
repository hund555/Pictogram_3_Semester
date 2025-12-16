/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './StyleSheet/UI_Module_Template.css';
import PictogramService from "../Services/PictogramService";



function EditPictogram() {
    //fetch data passed from previous site,
    const location = useLocation();
    const item = location.state?.item;
    //allows the navigation back to DisplayAllPictogram
    const navigate = useNavigate();
    console.log(item.title)
    if (item == null) { return(<h3>Error</h3>) }
    
    //Data
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [title, setTitle] = useState<string>(item.title);
    const [file, setFile] = useState<string>(item.picture);
    const [fileType, setFileType] = useState<string>(item.fileType)
    const [descripion, setDescription] = useState<string>(item.description);
    const [isPrivate, setisPrivate] = useState<boolean>(item.isPrivate);
    
    //restrict, what Filetypes can be uploaded by the user;
    const acceptedFileEndingList: string[] = [".jpg", ".png", ".svg"];

   
   

    //Eventhandler to process fileupload
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length !== 0) {
            setFile(await fileToBase64(e.target.files[0]));
            setFileType(e.target.files[0].type)
            const fileInput = document.getElementById("fileInput") as HTMLInputElement;
            if (fileInput.files != null && fileInput != null) {
                setFile(await fileToBase64(fileInput.files[0]));
            }
        }
    }

    const handleSubmit = async () => { //handleSubmit
        if (file == null) { setErrorMessage("Der er ikke valgt en fil"); return; }
        if (title == "") { setErrorMessage("Titel skal udfyldes"); return; }

        const userId = localStorage.getItem("loggedInUserId");
        if (!userId) {
            setErrorMessage("Du er ikke logget ind");
            return;
        }

      
        PictogramService.updatePictogram(item.pictogramId, title, descripion, file, fileType, item.userId, isPrivate);

        
        navigate("/displayallpictograms")



    }
    const acceptableFileEndings = () => {
        let result: string = "";
        for (let i = 0; i < acceptedFileEndingList.length; i++) {
            result += acceptedFileEndingList[i] + ", "
        }
        return result;
    }


    //HTML
    return (

        <div className="module">
            <div ><ImagePreview file={file} fileType={fileType} /></div>
            <br />
            <label>
                Title:
                <input type="text" value={title} name="Title" placeholder="Indtast titel" onChange={e => setTitle(e.target.value)}></input>
            </label>

            <br />
            <label>
                Desc:
                <input type="text" height="200px" width="200px" onChange={e => setDescription(e.target.value)} value={descripion} /></label>
            <br />
            <label>
                File:
                <input id="fileInput" accept={acceptableFileEndings()} type="file" onChange={handleFileChange}></input>
            </label> <br />
            <label>Kun synligt for mig: <input type="checkbox" onChange={() => setisPrivate(!isPrivate)} checked={isPrivate}></input> </label>

            <label style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</label><br />
            <button onClick={handleSubmit}>Ret</button>
        </div>
    );


}
//Create own property to pass the file;
type ImagePreviewProps = {
    file: string
    fileType:string

}


//Custom Previewer
const ImagePreview = ({ file, fileType }: ImagePreviewProps) => {
    if (!file) { return null };
    return (<img className="imagePreview" style={{ height: 240, width: 240 }} src={`data:${fileType};base64,${file}`} />)

}



export default EditPictogram;





//simple file to base64 string converter ==> Used for simple file transfer <==
const fileToBase64 = (file: File): Promise<string> => {
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


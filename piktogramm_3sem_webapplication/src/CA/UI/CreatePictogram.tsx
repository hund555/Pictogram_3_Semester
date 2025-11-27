/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Pictogram from '../Domain/Pictogram'


export default function ViewCreatePictogram() {
    //Data

    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null >(null);
    const [descripion, setDescription] = useState('');
    const [test, setTest] = useState();
    //restrict, what Filetypes can be uploaded by the user;
    const acceptedFileEndingList: String[] = [ ".jpg", ".png", ".svg" ];
    
    //Eventhandler to process fileupload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length !== 0) {
            setFile(e.target.files[0])
            
        }
    }

    const handleSubmit = () => { //handleSubmit

        if (title != "" && file != null && descripion != "") {
            const pictogram = new Pictogram(title, file, descripion);
            if (pictogram != null) {
                //insert API port here
                alert("success")
            }
        }

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

        <div>
            <ImagePreview file={file}/>
            <br/>
            <label>
                Title:
                
                <input value={title} name="Title" placeholder="Enter your title" onChange={e => setTitle(e.target.value)}></input>
            </label> <br />
           
            <label>
                Description:
                <input type="text" height="200px" width="200px" onChange={e => setDescription(e.target.value)} value={descripion} />
            </label><br />
            <label>
                File:
                <input accept={ acceptableFileEndings()} type="file" onChange={handleFileChange}></input>
            </label> <br />
            <button onClick={handleSubmit}>Opret</button>
        </div>




    </>);


}
//Create own type to store file in
type ImagePreviewProps = {
    file: File | null

}


//Custom Previewer
  const ImagePreview = ({ file }: ImagePreviewProps) => {
    if (!file) { return null };
    return (<img src={URL.createObjectURL(file)} />)

}

/* eslint-disable @typescript-eslint/no-unused-vars */
export default interface Pictogram {
/*    pictogramID: number;
    title: string;
    description: string;
    file: File;
     fileType: String;
     userID: string;
    isPrivate: boolean;*/
    pictogramID:number
    title: string,
    description: string,
    fileType: string,
    isPrivate: boolean,
    file: File,
    userId: string
/*    
     constructor(pictogramID: number | null, title: string, description: string, isPrivate: boolean, file: File, userID: string) {
        this.pictogramID = pictogramID;
        this.title = title;
        this.description = description;
        this.file = file;
        this.fileType = file.name.split(".")[1];
        this.userID = userID
        this.isPrivate = isPrivate
        
    }*/


} 
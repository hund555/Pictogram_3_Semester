/* eslint-disable @typescript-eslint/no-unused-vars */
export default class Pictogram {
    public pictogramID
    public title: string | undefined;
    public description: string | undefined;
    public file: File | undefined;
    public fileType: String;
    public userID: string | undefined;
    public isPrivate: boolean = true;
    
    public constructor(pictogramID: number | null, title: string, description: string, isPrivate: boolean, file: File, userID: string) {
        this.pictogramID = pictogramID;
        this.title = title;
        this.description = description;
        this.file = file;
        this.fileType = file.name.split(".")[1];
        this.userID = userID
        this.isPrivate = isPrivate
        
    }


} 
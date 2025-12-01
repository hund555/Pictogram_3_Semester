/* eslint-disable @typescript-eslint/no-unused-vars */
export default class Pictogram {
    public userID: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public isPrivate: boolean = true;
    public file: File | undefined;
    
    
    public constructor(userID: string, description: string, title: string, isPrivate:boolean, file: File) {
        this.userID = userID
        this.title = title;
        this.description = description;
        this.isPrivate = isPrivate
        this.file = file;
    }


} 
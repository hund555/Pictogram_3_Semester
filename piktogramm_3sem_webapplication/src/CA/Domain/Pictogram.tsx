/* eslint-disable @typescript-eslint/no-unused-vars */
export default class Pictogram {
    
    public title: string | undefined;
    public file: File | undefined;
    public description: string | undefined;
    public constructor(title: string, file: File, description: string) {
        
        this.title = title;
        this.file = file;
        this.description = description;
    }
}
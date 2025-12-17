/* eslint-disable @typescript-eslint/no-unused-vars */

/*
* Interface representing a pictogram entity used in the application
*/
export default interface Pictogram
{
    pictogramId:string
    title: string,
    description: string,
    fileType: string,
    isPrivate: boolean,
    pictureBytes: string,
    userId: string
} 
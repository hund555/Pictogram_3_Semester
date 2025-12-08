/*
Represents all Pictogram objetcs retrieved from the API backend
*/
export default interface AllPictograms {

    pictogramID: string,
    title: string,
    description: string,
    fileType: string,
    isPrivate: boolean,
    picture : string,
    userId: string
} 
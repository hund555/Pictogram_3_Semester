/*
* An interface representing user information returned from the backend
* and used for displaying user-related data in the UI.
*/
export default interface UserDisplayInfo {
    id: string;
    name: string;
    email: string;
    role: string;
}
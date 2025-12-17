/*
* Represents a user object recieved from the API backend
*/
export default interface UserWeb {
    userId: string;
    email: string;
    password: string;
    fullName: string;
    role: string;
}
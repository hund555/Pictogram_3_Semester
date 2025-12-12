import data from "../backend_Address.json";
export default class Environment {

    static getBackendAddress = (): string => {
        return data.protocol + "://" + data.ipaddress + ":" + data.port;



    }
    static debugUserId = "b0802d7a-2fb0-42d0-bac9-345248a00bb8";

}
import data from "../backend_Address.json";
export default class Environment {

    static getBackendAddress = (): string => {
        return data.protocol + "://" + data.ipaddress + ":" + data.port;



    }
    static debugUserId = "162b01d1-1dbb-46c5-82e9-ed2af0c43c77";

}
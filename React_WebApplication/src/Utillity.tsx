import data from "../backend_Address.json";
export default class Environment {

    static getBackendAddress = (): string => {
        return data.protocol + "://" + data.ipaddress + ":" + data.port;



    }
    static debugUserId = "8a6509f0-012d-4efc-9bfd-c3406a5c5f04";

}
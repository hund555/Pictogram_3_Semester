import axios, { type AxiosResponse } from "axios";
import type DailySchedule from "../Domain/DailySchedule";
const baseurl = "http://localhost:5247";
export default class DailyScheduleService {

    
    static async fetchDailyScheduleToday(userId: string): Promise<DailySchedule> {


        return await axios.get(baseurl + "/dailyschedule/today/" + userId)
            .then((response: AxiosResponse<DailySchedule>) => { return response.data })
            
        

    }
    static async fetchDailyScheduleDay(userId: string, day: string): Promise<DailySchedule> {

        return await axios.get(baseurl + "/dailyschedule/" + day + "/" + userId)
            .then((response: AxiosResponse<DailySchedule>) => {return response.data })
            
    }
} 
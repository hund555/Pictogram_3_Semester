import axios, { type AxiosResponse } from "axios";
import type DailySchedule from "../Domain/DailySchedule";
import Environment from "../Utillity";
import type Task from "../Domain/Task";

//import type Pictogram from "../Domain/Pictogram"

const baseurl = Environment.getBackendAddress();
export default class DailyScheduleService {


    static async fetchDailyScheduleToday(userId: string): Promise<DailySchedule> {


        return await axios.get(baseurl + "/dailyschedule/today/" + userId, { withCredentials: true })
            .then((response: AxiosResponse<DailySchedule>) => { return response.data })



    }
    static async fetchDailyScheduleDay(userId: string, day: string): Promise<DailySchedule> {

        return await axios.get(baseurl + "/dailyschedule/" + day + "/" + userId, { withCredentials: true })
            .then((response: AxiosResponse<DailySchedule>) => { return response.data })

    }

    static async deleteDailyScheduleTask(taskId: string) {
        console.log("call ok")
        return axios.delete(baseurl + "/dailyschedule/deleteTaskById/" + taskId, { withCredentials: true })
            .then((response: AxiosResponse) => { console.log(response.data) })
            .catch(err => { console.log(err) })
    }
    static async createDailyScheduleTask(userId: string, day: string, task: Task) {
        const pictogramId = task.pictogram.pictogramId;
        const index = task.index;
        const payload = { userId, day, pictogramId, index };

        return await axios.post(baseurl + "/dailyschedule/tasks", payload, { withCredentials: true })
            .then((response) => response.data)
    }
    static async updateIndex(task: Task, index: number, occupandTask: Task) {
        const taskId = task.dailyScheduleTaskId;
        const occupandTaskId = occupandTask.dailyScheduleTaskId;
        const payload = { taskId, index, occupandTaskId }
        axios.put(baseurl + "/dailyschedule/updateIndex", payload)
            .then((response: AxiosResponse) => response.data)

    }



} 
import axios, { type AxiosResponse } from "axios";
import type DailySchedule from "../Domain/DailySchedule";
import Environment from "../Utillity";
import type Task from "../Domain/Task";

const baseurl = Environment.getBackendAddress();

/* 
* A Service-class to handle HTTP-calls to the DailyScheduele-API
*/
export default class DailyScheduleService
{
    //Sends a request to the backend-API to get the daily scheduele for the current day
    static async fetchDailyScheduleToday(userId: string): Promise<DailySchedule>
    {
        return await axios.get(baseurl + "/dailyschedule/today/" + userId, { withCredentials: true })
            .then((response: AxiosResponse<DailySchedule>) => { return response.data })
    }

    //Sends a request to the backend-API to get the scheduele for a chosen day. (Not implemented)
    static async fetchDailyScheduleDay(userId: string, day: string): Promise<DailySchedule> {

        return await axios.get(baseurl + "/dailyschedule/" + day + "/" + userId, { withCredentials: true })
            .then((response: AxiosResponse<DailySchedule>) => { return response.data })

    }

    //Sends a request to the backend-API to delete a task from the daily scheduele
    static async deleteDailyScheduleTask(taskId: string) {
        console.log("call ok")
        return axios.delete(baseurl + "/dailyschedule/deleteTaskById/" + taskId, { withCredentials: true })
            .then((response: AxiosResponse) => response.data)
            .catch(err => { console.log(err) })
    }

    //Sends a request to the backend-API to get create a task for the daily scheduele
    static async createDailyScheduleTask(userId: string, day: string, task: Task) {
        const pictogramId = task.pictogram.pictogramId;
        const index = task.index;
        const payload = { userId, day, pictogramId, index };

        return await axios.post(baseurl + "/dailyschedule/tasks", payload, { withCredentials: true })
            .then((response) => response.data)
    }

    //Sends a request to the backend-API to change the task order in the daily scheduele
    static async updateIndex(task: Task, index: number, occupandTask: Task) {
        const taskId = task.dailyScheduleTaskId;
        const occupandTaskId = occupandTask.dailyScheduleTaskId;
        const payload = { taskId, index, occupandTaskId }
        axios.put(baseurl + "/dailyschedule/updateIndex", payload, {withCredentials: true})
            .then((response: AxiosResponse) => response.data)

    }
} 
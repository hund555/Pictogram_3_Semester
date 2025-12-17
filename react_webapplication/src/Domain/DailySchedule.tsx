import type Task from "./Task"

/*
* An interface representing a daily scheduele  containing tasks for a specific day.
*/
export default interface DailySchedule
{
    day: string,
    tasks: Task[]
}
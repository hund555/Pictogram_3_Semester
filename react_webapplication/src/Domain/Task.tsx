import type Pictogram from "./Pictogram"

/*
* An interface to represent a task in a daily scheduele
*/
export default interface Task {
    dailyScheduleTaskId: string,
    index: number,
    pictogram: Pictogram
}
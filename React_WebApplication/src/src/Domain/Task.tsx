import type Pictogram from "./Pictogram"

export default interface Task {
    dailyScheduleTaskID: string,
    index: number,
    pictogram: Pictogram
}
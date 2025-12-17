import type Pictogram from "./Pictogram"

export default interface Task {
    dailyScheduleTaskId: string,
    index: number,
    pictogram: Pictogram
}
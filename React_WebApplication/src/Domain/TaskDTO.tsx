import type PictogramDTO from "./PictogramDTO"

export default interface TaskDTOL {
    dailyScheduleTaskId: string,
    index: number,
    pictogram: PictogramDTO;
}
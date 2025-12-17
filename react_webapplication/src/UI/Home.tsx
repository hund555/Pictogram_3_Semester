/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import type Task from "../Domain/Task";
import { useState, useEffect, type CSSProperties } from "react"
import { useNavigate } from "react-router-dom";
import DailyScheduleService from "../Services/DailyScheduleService"
import PictogramService from "../Services/PictogramService";
import type Pictogram from "../Domain/Pictogram"
import { Tasklist } from "../Domain/Tasklist"

import type AllPictograms from "../Domain/AllPictograms";
export default function Home() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("loggedInUserId");
    
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    if (!userId || userId == null) { navigate("/login"); return; };
    useEffect(() => {
        DailyScheduleService.fetchDailyScheduleToday(userId)
            .then((DailySchedule) => {
                
                Tasklist.set(DailySchedule.tasks);
                setTasks([...Tasklist.Tasks])

            })
            .catch((err) => { console.log(err) })
        const unsubscribe = Tasklist.onChange(() => {
            setTasks([...Tasklist.Tasks])
        });

    }, [])

    return (<>
        <div style={{ display: "flex", placeContent: "center" }}>
            <h2>{new Date().toLocaleString('da-DK', { weekday: 'long' })}</h2>
            <button

                style={{ fontSize: "10px", width: "100px", marginLeft: "328px" }}
                onClick={() => setIsEditMode(!isEditMode)}
            >{isEditMode ? "Gem" : "Ret"}</button></div>
        {isEditMode ? <EditScheduel tasks={tasks} /> : <ViewScheduel tasks={tasks} />}
    </>)

}
type TaskProps = {
    tasks: Task[]

}

function ViewScheduel(tasks: TaskProps) {

    //Tasklist.Tasks.push(schedule.tasks)
    return (<>
        {
            <>
                <div style={{ placeContent: "center", display: "grid" }}>
                    <TaskView tasks={tasks.tasks}></TaskView>

                </div>
            </>
        }
    </>);
}


const TaskView = (tasks: TaskProps) => {

    return (
        <div style={{ borderStyle: "solid", borderColor: "black", height: "flex", width: "500px", }}>
            {tasks.tasks.map((t, index) => (
                <div style={{ borderStyle: "solid", borderColor: "gray", display: "block", marginBottom: "5px", backgroundColor: "rgba(48, 48, 48, 128)" }} key={index}>
                    <img src={"data:" + t.pictogram.fileType + ";base64," + t.pictogram.pictureBytes} style={{ height: "120px", width: "120px" }} />
                    <h2>{t.pictogram.title}</h2>
                    <p>{t.pictogram.description}</p>
                    <input id={index + "_checkmark"} type="checkbox" style={{ height: "50px", width: "50px" }} onChange={e => { if (e.target.checked) { alert("Godt gjordt") } }} />
                </div>        
            ))}
        </div>
    )
}

function EditScheduel(tasks: TaskProps) {

    const [libraryVisibiliy, setLibraryVisibility] = useState<CSSProperties["visibility"]>("hidden")
    //defines if 
    const [buttonState, setButtonState] = useState<boolean>(false)
    const [addButtonChar, setAddButtonChar] = useState<string>("+")
    useEffect(() => {
        Tasklist.onChange(() => {
            setLibraryVisibility("hidden");
            setAddButtonChar("+");
        })
    }, [])

    return (<>
        {
            <>
                <div><TaskEdit tasks={tasks.tasks}></TaskEdit></div>
                <button onClick={() => { if (!buttonState) { setLibraryVisibility("visible"); setButtonState(!buttonState); setAddButtonChar("x") } else { setLibraryVisibility("hidden"); setAddButtonChar("+"); setButtonState(!buttonState) } }} >{addButtonChar}</button>
                <div style={{ visibility: libraryVisibiliy }}>
                    <PictogramLibrary></PictogramLibrary>
                </div>
            </>
        }
    </>);

}
const TaskEdit = (tasks: TaskProps) => {

    return (

        <div style={{ borderStyle: "solid", borderColor: "black", display: "inline" }}>
            {tasks.tasks.map((t, index) => (

                <div style={{ borderStyle: "solid", borderColor: "gray", display: "flex", backgroundColor: "rgba(48, 48, 48, 128)", marginBottom: "20px" }} key={index}>
                    <div style={{ display: "grid", height: "100px", width: "100px", marginTop: "35px" }}>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => { if (t.index > 0) { DailyScheduleService.updateIndex(t, t.index - 1, Tasklist.Tasks[t.index - 1]) } Tasklist.moveUp(t.index); }}>↑</button>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => { DailyScheduleService.deleteDailyScheduleTask(t.dailyScheduleTaskId); Tasklist.remove(index); }}>-</button>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => { if (t.index < Tasklist.Tasks.length) { DailyScheduleService.updateIndex(t, t.index + 1, Tasklist.Tasks[t.index + 1]) } Tasklist.moveDown(t.index) }}>↓</button>
                    </div>
                    <div style={{ display: "flex" }}>
                        <img src={"data:" + t.pictogram.fileType + ";base64," + t.pictogram.pictureBytes} style={{ height: "200px", width: "200px" }} />
                        <div><h2>{t.index} {t.pictogram.title}</h2><br />
                            <p>{t.pictogram.description}</p>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function PictogramLibrary() {

    const [PictogramLib, setPictogramLib] = useState<Pictogram[]>(new Array<Pictogram>);
    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) return;
    useEffect(() => {
        PictogramService.displayAllPictograms()

            .then((pictograms:AllPictograms[]) => {
                const pictogramsCorrected: Pictogram[] = pictograms.map(pictogram => ({

                    pictogramId: pictogram.pictogramId,
                    title: pictogram.title,
                    description: pictogram.description,
                    fileType: pictogram.fileType,
                    isPrivate: pictogram.isPrivate,
                    pictureBytes: pictogram.picture,
                    userId: pictogram.userId
                }));
                setPictogramLib(pictogramsCorrected);
            });
    }, [])


    if (!PictogramLib || PictogramLib.length == 0) { return (<><h3 style={{ color: "red" }}>Error, Pictograms could not be loaded</h3></>) }

    return (<>

        <div style={{ display: "flex", borderStyle: "solid", borderColor: "grey", backgroundColor: "rgba(48, 48, 48, 128)" }}>
            {PictogramLib.map((pictogram, index) => (
                <div key={index} style={{ display: "block", borderColor: "#303030", borderStyle: "solid", height: "200px", width: "200px" }} onClick={() => { Tasklist.addOne({ pictogram: pictogram, dailyScheduleTaskId: crypto.randomUUID(), index: Tasklist.Tasks.length }); DailyScheduleService.createDailyScheduleTask(userId, new Date().toLocaleString('en-GB', { weekday: 'long' }), Tasklist.Tasks[Tasklist.Tasks.length - 1]); }}>
                    <h4>{pictogram.title}</h4>
                    <img style={{ height: "60px", width: "60px" }} src={"data:" + pictogram.fileType + ";base64," + pictogram.pictureBytes}></img>
                    <p>{pictogram.description}</p>
                </div>
            ))}
        </div>
    </>);
}


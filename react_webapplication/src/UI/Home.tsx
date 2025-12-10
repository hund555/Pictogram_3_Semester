import type Task from "../Domain/Task";
import {useState,useEffect, type CSSProperties} from "react"
import type DailySchedule from "../Domain/DailySchedule"
import DailyScheduleService from "../Services/DailyScheduleService"
import PictogramService from "../Services/PictogramService";
import type Pictogram from "../Domain/Pictogram"
import { Tasklist } from "../Domain/Tasklist" 
import Environment from "../Utillity"

export default function Home() {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [schedule, setSchedule] = useState<DailySchedule | null>(null);
    useEffect(() => {
        DailyScheduleService.fetchDailyScheduleToday(Environment.debugUserId)
            .then((DailySchedule) => {
                setSchedule(DailySchedule);

            })
            .catch(e => { console.log(e); })
    }, [])
    if (!schedule) { return (<> <h2>{new Date().toLocaleString('da-DK', { weekday: 'long' })}</h2> <br/><h2 style={{ color: "red" }}>Error, Schedule could not be loaded</h2></>) }
    Tasklist.addMany(schedule.tasks);



    return (<>
        <div style={{display:"flex", placeContent:"center"} }>
            <h2>{new Date().toLocaleString('da-DK', { weekday: 'long' })}</h2>
            <button
                
                style={{ fontSize: "10px", width:"100px" ,marginLeft:"200px" }}
                onClick={() => setIsEditMode(!isEditMode)}
            >{isEditMode ? "Gem" : "Ret"}</button></div>
        {isEditMode ? <EditScheduel /> : <ViewScheduel />}


    </>)
            
           

       
    
}



function ViewScheduel() {

        //Tasklist.Tasks.push(schedule.tasks)
    return (<>
        {
            <>
                <div style={{ placeContent: "center", display: "grid" }}>
                    <TaskView tasks={Tasklist.Tasks}></TaskView>

                </div>
                
            </>
        }

    </>);



    //HTML 

}

type TaskViewProps = {
    tasks: Task[]
    
}
const TaskView = (tasks: TaskViewProps) => {
    return (
        <div style={{borderStyle:"solid", borderColor:"black", height:"flex", width:"500px"} }>
            {tasks.tasks.map((t, index) => (
                <div style={{ borderStyle: "solid", borderColor: "gray", display: "block" }} key={index}>
                    <img src={"data:" + t.pictogram.fileType + ";base64," + t.pictogram.picture} style={{ height: "120px", width: "120px" }} />
                    <h2>{t.pictogram.title}</h2>
                    <p>{t.pictogram.description}</p>
                    <input id={index + "_checkmark"} type="checkbox" style={{ height: "50px", width: "50px" }} onChange={e => { if (e.target.checked) { alert("Godt gjordt") } }} />
                </div>
            
            
            ))}




        </div>
    )
    
}

function EditScheduel() { 
    
    
    const [libraryVisibiliy, setLibraryVisibility] = useState<CSSProperties["visibility"]>("hidden")
    //defines if 
    const [buttonState, setButtonState] = useState<boolean>(false)
    const [addButtonChar, setAddButtonChar] = useState<string>("+")

        
    return (<>
        {
            <>
                
                <div><TaskEdit tasks={Tasklist.Tasks}></TaskEdit></div>
                <button onClick={() => { if (!buttonState) { setLibraryVisibility("visible"); setButtonState(!buttonState); setAddButtonChar("x") } else { setLibraryVisibility("hidden"); setAddButtonChar("+"); setButtonState(!buttonState) } }} >{addButtonChar}</button>
                <div style={{visibility:libraryVisibiliy} }>
                    <PictogramLibrary></PictogramLibrary>

                </div>
            </>
        }

    </>);





}   
const TaskEdit = (tasks: TaskViewProps) => {
    const [internalTasklist, setinternalTasklist] = useState<Task[]>(tasks.tasks);

    useEffect(() => {
        Tasklist.onChange(() => { setinternalTasklist([...Tasklist.Tasks]) })
    }, [])

    return (
        <div style={{ borderStyle: "solid", borderColor: "black", display:"inline" }}>
            {internalTasklist.map((t, index) => (
                <div style={{ borderStyle: "solid", borderColor: "gray", display: "flex" }} key={index}>
                    <div style={{display:"grid", height:"100px", width:"100px", marginTop:"35px"} }>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => {Tasklist.moveUp(index) } }>↑</button>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => { Tasklist.remove(index); setinternalTasklist([...Tasklist.Tasks]) } }>-</button>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => { Tasklist.moveDown(index) }}>↓</button>
                    </div>
                    <div style={{display:"flex"} }>
                        <img src={"data:" + t.pictogram.fileType + ";base64," + t.pictogram.picture} style={{ height: "200px", width: "200px" }} />
                        <div><h2>{t.index} ---- {t.pictogram.title} --- {index}</h2><br/>
                        <p>{t.pictogram.description}</p></div>
                    
                    </div>
                </div>


            ))}




        </div>
    )

}

function PictogramLibrary() { 
    const [PictogramLib, setPictogramLib] = useState<Pictogram[] | null>(null)
    useEffect(() => {
        PictogramService.getAllPictograms(Environment.debugUserId)
            .then((PictogramList) => { setPictogramLib(PictogramList) });
            
    }, [])
    if (!PictogramLib || PictogramLib.length == 0) { return (<><h3 style={{color:"red"} }>Error, Pictograms could not be loaded</h3></>) }
   
    return (<>

        <div style={{display:"flex"} }>
            {PictogramLib.map((pictogram: Pictogram, index) => (
                <div key={index} style={{ display: "block" }} onClick={() => { Tasklist.addOne({ pictogram: pictogram, dailyScheduleTaskID: crypto.randomUUID(), index: Tasklist.Tasks.length }) } }>
                    <h4>{pictogram.title}</h4>
                    <img style={{ height: "60px", width: "60px" }} src={"data:" + pictogram.fileType + ";base64," + pictogram.picture}></img>
                    <p>{pictogram.description}</p>
                </div>
            )) }
        </div>

        
</>);
}


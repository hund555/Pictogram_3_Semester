/* eslint-disable @typescript-eslint/no-unused-expressions */
import type Task from "../Domain/Task";
import {useState,useEffect, type CSSProperties} from "react"

import DailyScheduleService from "../Services/DailyScheduleService"
import PictogramService from "../Services/PictogramService";
import type Pictogram from "../Domain/Pictogram"
import { Tasklist } from "../Domain/Tasklist" 
import Environment from "../Utillity"


export default function Home() {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([])
    useEffect(() => {
        DailyScheduleService.fetchDailyScheduleToday(Environment.debugUserId)
            .then((DailySchedule) => {
                setTasks(DailyScheduleService.mapDTODailyScheduleToDomain(DailySchedule).tasks)
                Tasklist.addMany(DailyScheduleService.mapDTODailyScheduleToDomain(DailySchedule).tasks);
            })
            .catch((err) => { console.log(err) })
        const unsubscribe = Tasklist.onChange(() => {
            setTasks([...Tasklist.Tasks])
        });
        
    }, [])

 
    


    return (<>
        <div style={{display:"flex", placeContent:"center"} }>
            <h2>{new Date().toLocaleString('da-DK', { weekday: 'long' })}</h2>
            <button
                
                style={{ fontSize: "10px", width:"100px" ,marginLeft:"328px" }}
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



    //HTML 

}


const TaskView = (tasks:TaskProps) => {
    



    return (
        <div style={{ borderStyle: "solid", borderColor: "black", height: "flex", width: "500px", backgroundColor: "rgba(48, 48, 48, 128)" } }>
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

function EditScheduel(tasks: TaskProps) { 
    
    
    const [libraryVisibiliy, setLibraryVisibility] = useState<CSSProperties["visibility"]>("hidden")
    //defines if 
    const [buttonState, setButtonState] = useState<boolean>(false)
    const [addButtonChar, setAddButtonChar] = useState<string>("+")

        
    return (<>
        {
            <>
                
                <div><TaskEdit tasks={tasks.tasks}></TaskEdit></div>
                <button onClick={() => { if (!buttonState) { setLibraryVisibility("visible"); setButtonState(!buttonState); setAddButtonChar("x") } else { setLibraryVisibility("hidden"); setAddButtonChar("+"); setButtonState(!buttonState) } }} >{addButtonChar}</button>
                <div style={{visibility:libraryVisibiliy} }>
                    <PictogramLibrary></PictogramLibrary>

                </div>
            </>
        }

    </>);





}   
const TaskEdit = (tasks: TaskProps) => {
    const [taskList, setTaskList] = useState<Task[]>(tasks.tasks)
    const [updateBool, setUpdateBool] = useState<boolean>(false);
    

    return (
        
        <div style={{ borderStyle: "solid", borderColor: "black", display:"inline" }}>
            {tasks.tasks.map((t, index) => (
                
                <div style={{ borderStyle: "solid", borderColor: "gray", display: "flex", backgroundColor: "rgba(48, 48, 48, 128)" }} key={index}>
                    <div style={{display:"grid", height:"100px", width:"100px", marginTop:"35px"} }>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => { Tasklist.moveUp(index); } }>↑</button>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => { DailyScheduleService.deleteDailyScheduleTask(t.dailyScheduleTaskID); Tasklist.remove(index); setUpdateBool(!updateBool) } }>-</button>
                        <button style={{ width: "100px", borderStyle: "solid", borderColor: "white" }} onClick={() => { Tasklist.moveDown(index) }}>↓</button>
                    </div>
                    <div style={{display:"flex"} }>
                        <img src={"data:" + t.pictogram.fileType + ";base64," + t.pictogram.picture} style={{ height: "200px", width: "200px" }} />
                        <div><h2>{t.pictogram.title}</h2><br/>
                            <p>{t.pictogram.description}</p>
                            
                        </div>
                        </div>
                    </div>


            ))}




        </div>
    )

}

function PictogramLibrary() { 
    //const [PictogramDTOLib, setPictogramDTOLib] = useState<PictogramDTO[]>();
    const [PictogramLib, setPictogramLib] = useState<Pictogram[]>(new Array<Pictogram>);
    useEffect(() => {
        PictogramService.getAllPictograms(Environment.debugUserId)
            
            .then((dtoList) => {
                
                
                setPictogramLib(dtoList)

            });
            
            
    }, [])

    


    if (!PictogramLib || PictogramLib.length == 0) { return (<><h3 style={{color:"red"} }>Error, Pictograms could not be loaded</h3></>) }
    
       
    return (<>

        <div style={{ display: "flex", borderStyle: "solid", borderColor: "grey", backgroundColor:"rgba(48, 48, 48, 128)"} }>
            {PictogramLib.map((pictogram, index) => (
                <div key={index} style={{ display: "block", borderColor: "#303030", borderStyle: "solid", height: "200px", width:"200px" }} onClick={() => { Tasklist.addOne({ pictogram: pictogram, dailyScheduleTaskID: crypto.randomUUID(), index: Tasklist.Tasks.length }); DailyScheduleService.createDailyScheduleTask(Environment.debugUserId, new Date().toLocaleString('en-GB', { weekday: 'long' }), Tasklist.Tasks[Tasklist.Tasks.length - 1]); } }>
                    <h4>{pictogram.title}</h4>
                    <img style={{ height: "60px", width: "60px" }} src={"data:" + pictogram.fileType + ";base64," + pictogram.picture}></img>
                    <p>{pictogram.description}</p>
                    
                </div>
            )) }
        </div>

        
</>);
}


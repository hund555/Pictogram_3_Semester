import type Task from "../Domain/Task";
import {useState,useEffect } from "react"
import type DailySchedule from "../Domain/DailySchedule"
import DailyScheduleService from "../Services/DailyScheduleService"
export default function Home() {

    



    return (<ViewScheduel></ViewScheduel>)
            
           

       
    
}

function ViewScheduel() {
    const [schedule, setSchedule] = useState<DailySchedule | null>(null);
    useEffect(() => {
        DailyScheduleService.fetchDailyScheduleToday("7423c0e6-fbee-4165-aec2-02dfa60016ea")
            .then((DailySchedule) => {
                setSchedule (DailySchedule);
                
                


            })
            .catch(e => { console.log(e); return (<p>An Error Occured</p>); })
    }, [])
    if (!schedule) { return (<><h2 style={{color:"red"} }></h2></>) }
    const tasks: Task[] = schedule.tasks;
    
    return (<>
        {
            <>
                <h2>{schedule.day}</h2>
                <TaskView tasks={tasks}></TaskView>
            </>
        }

    </>);



//HTML

}

type TaskViewProps = {
    tasks: Task[]
}
const TaskView = (tasks: TaskViewProps) => {
    if (!tasks.tasks || tasks.tasks.length === 0) {
        return (<h3>An Error Occured</h3>)
    }
    return (
        <div style={{borderStyle:"solid", borderColor:"black"} }>
            {tasks.tasks.map((t, index) => (
                <div style={{borderStyle:"solid", borderColor:"gray"}} key={index}>
                    <h2>{t.pictogram.title}</h2>
                    <img src={"data:" + t.pictogram.fileType + ";base64," + t.pictogram.pictureBytes} style={{height:"120px", width:"120px"}} />
                    <p>{t.pictogram.description}</p>
                    <input id={index + "_checkmark"} type="checkbox" style={{ height: "50px", width: "50px" }} onChange={e => { if (e.target.checked) { alert("Godt gjordt") } }} />
                </div>
            
            
            ))}




        </div>
    )
    
}

function EditScheduel() {
    const [schedule, setSchedule] = useState<DailySchedule | null>(null);
    useEffect(() => {
        DailyScheduleService.fetchDailyScheduleToday("7423c0e6-fbee-4165-aec2-02dfa60016ea")
            .then((DailySchedule) => {
                setSchedule(DailySchedule);




            })
            .catch(e => { console.log(e); return (<p>An Error Occured</p>); })
    }, [])
    if (!schedule) { return (<><h2 style={{ color: "red" }}></h2></>) }
    const tasks: Task[] = schedule.tasks;

    return (<>
        {
            <>
                <h2>{schedule.day}</h2>
                <TaskEdit tasks={tasks}></TaskEdit>
            </>
        }

    </>);





}   
const TaskEdit = (tasks: TaskViewProps) => {
    if (!tasks.tasks || tasks.tasks.length === 0) {
        return (<h3>An Error Occured</h3>)
    }
    return (
        <div style={{ borderStyle: "solid", borderColor: "black", display:"inline" }}>
            {tasks.tasks.map((t, index) => (
                <div style={{ borderStyle: "solid", borderColor: "gray", display: "block" }} key={index}>
                    <div>
                        <button>&#8593</button>
                        <button>-</button>
                        <button>&#8595</button>
                    </div>
                    <div>
                    <h2>{t.pictogram.title}</h2>
                    <img src={"data:" + t.pictogram.fileType + ";base64," + t.pictogram.pictureBytes} style={{ height: "120px", width: "120px" }} />
                    <p>{t.pictogram.description}</p>
                    <input id={index + "_checkmark"} type="checkbox" style={{ height: "50px", width: "50px" }} onChange={e => { if (e.target.checked) { alert("Godt gjordt") } }} />
                </div>
                </div>


            ))}




        </div>
    )

}
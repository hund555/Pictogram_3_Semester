/*import Schedule from "../Domain/DailySchedule";
import logo from "../../assets/pictoplanner_logo.svg"
*/
import { useNavigate } from "react-router-dom";
function LandingPage() {
    const navigateToSite = useNavigate();


    function displayAllPictograms() {
        navigateToSite("/displayallpictograms");
    }


    return (<ViewScheduel></ViewScheduel>)



    //<li><h3>"+ task.title +"</h3><br> <img src="+ task.pictogram?.file + "/><br/><p>"+ task.description + "</p></li>
    function ViewScheduel() {
        /*const schedule = fetchSchedule();
        const tasks: Array<string> = [];
        for (const task of schedule.taskList) {
            tasks.push(" \n")
        }*/
        //HTML
        return (
            <div>
                <h1>PictoPlanner</h1>

                {/* ===== Buttons ===== */}
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "top", marginTop: "1rem" }}>
                    <button onClick={displayAllPictograms}>Piktogrammer</button>
                </div>
                {/* <h1>{schedule.day}</h1>
        <ul style={{ placeItems: "center" }}>
            <div style={{ borderColor: "red", borderStyle: "solid" }} id="taskDiv" onClick={function () { const taskdiv = document.getElementById("taskDiv"); if (taskdiv.style.opacity = "1") { taskdiv.style.opacity = "0.1" } else { taskdiv.style.opacity = "1" } }} ><h3>Test</h3>
                <div>
                    <img src={logo} style={{ borderColor: "green", height: "120px", width: "120px" }} />




                </div> <br /><p>test</p>
            </div>



        </ul>
        */}

            </div>)
    }





    //function navigateToSite(arg0: string) {
    //    throw new Error("Function not implemented.");
    //}
}
export default LandingPage;
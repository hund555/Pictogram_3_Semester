import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./UI/LoginPage";
import RegisterNewUser from "./UI/RegisterNewUser";
import './App.css'
import CreatePictogram from "./UI/CreatePictogram";
import Home from './UI/Home'
import logo from "./assets/pictoplanner_logo.svg"
import WebUserService from "./Services/WebUserService";
let currentView = <Home></Home>

window.addEventListener("resize", function () {
    const test = document.getElementById("test");
    if (test) {
        test.style.width = window.innerWidth + "px";
    }
})//check for window resize
function App() {
    {/* SPA */}
    return (
        <>
            <Navbar/>
            <div>
                <nav>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/registerUser"}>Registrer</Link>
                    <Link to={"/createPictogram"}></Link>
                    <Link to={"/"}></Link>
                </nav>
            </div>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registerUser" element={<RegisterNewUser />} />
                <Route path="/createPictogram" element={<CreatePictogram />} />
                <Route path="/" element={<Home />} />
            </Routes>
            
            
            {/*<div style={{ marginBottom: 15 }}><Navbar></Navbar></div>*/}

        </>
           
    );
}

export default App
function Navbar() {

    return (

        <nav className="navbar" id="test" style={{ position: "absolute", left:"0px", top:"0px" } }>
            
            <img src={logo} className="logo"></img>
            <button onClick={function () { currentView = <Home />; }}>home</button>
            <button onClick={function () { currentView = <CreatePictogram></CreatePictogram> }}  >Oprett Piktogramm</button>
            <button>{localStorage.getItem("loggedInUserName")}</button>
            <button onClick={logoutUser}>Logud</button>

        </nav>

    )
}

function logoutUser() {
    WebUserService.logout()
        .then(() =>
        {
            alert("Du er nu logget ud.");
        })
        .catch(() =>
        {
            alert("Der skete en fejl under logout. Prøv venligst igen.");
        })
        .finally(() =>
        {
            localStorage.removeItem("loggedInUserId");
            localStorage.removeItem("loggedInUserEmail");
            localStorage.removeItem("loggedInUserName");
            localStorage.removeItem("loggedInUserRole");
            window.location.href = "/login";
        });
}

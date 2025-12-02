import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginHomePage from "./UI/LoginHomePage";
import RegisterNewUser from "./UI/RegisterNewUser";
import './App.css'
import ViewCreatePictogram from './CA/UI/CreatePictogram';
import LandingPage from './CA/UI/LandingPage'
import logo from "./assets/pictoplanner_logo.svg"
let currentView = <LandingPage></LandingPage>
window.addEventListener("resize", function () {
    const test = document.getElementById("test");
    if (test) {
        test.style.width = window.innerWidth + "px";
    }
})//check for window resize
function App() {

    {/* SPA */}
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginHomePage />} />
                <Route path="/registerUser" element={<RegisterNewUser />} />
            </Routes>
        </BrowserRouter>   
    );
}

export default App
function Navbar() {

    return (

        <nav className="navbar" id="test">

            <img src={logo} className="logo"></img>
            <button onClick={function () { currentView = <LandingPage></LandingPage>; }}>home</button>
            <button onClick={function () { currentView = <ViewCreatePictogram></ViewCreatePictogram> }}  >Oprett Piktogramm</button>
            <button>test</button>

        </nav>

    )
}

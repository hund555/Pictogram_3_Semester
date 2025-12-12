import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./UI/LoginPage";
import RegisterNewUser from "./UI/RegisterNewUser";
import './App.css'
import CreatePictogram from "./UI/CreatePictogram";
import Home from './UI/Home'
import WebUserService from "./Services/WebUserService";
import DisplayAllPictograms from "./UI/DisplayAllPictograms";
import NavigationBar from "./UI/NavigationBar";

function App() {

    {/* SPA */}
    return (
        <>
            <NavigationBar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registerUser" element={<RegisterNewUser />} />

                {/* ===== Sites where navbar will be shown ===== */}
                <Route path="/home" element={<Home />} />
                <Route path="/createPictogram" element={<CreatePictogram />} />
                <Route path="/displayallpictograms" element={<DisplayAllPictograms />} />
              
            </Routes>
        </>           
    );
}
export default App



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

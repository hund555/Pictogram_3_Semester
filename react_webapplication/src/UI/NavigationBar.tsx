import { useNavigate } from "react-router-dom";
import logo from "../assets/pictoplanner_logo.svg";
import WebUserService from "../Services/WebUserService";

/* Component for the navigationbar for some of the sites */
function NavigationBar()
{
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <img src={logo} className="logo" />

            {/* ===== NavBar Buttons ===== */}
            <button onClick={() => navigate("/")}>Hjem</button>

            <button onClick={() => navigate("/createPictogram")}>Opret Piktogram</button>

            <button onClick={() => navigate("/displayallpictograms")}>Alle Piktogrammer</button>

            <button onClick={() => {
                WebUserService.logout()
                .then(() => {
                    alert("Du er nu logget ud.");
                })
                .catch(() => {
                    alert("Der skete en fejl under logout. Prøv venligst igen.");
                })
                .finally(() => {
                    localStorage.removeItem("loggedInUserId");
                    localStorage.removeItem("loggedInUserEmail");
                    localStorage.removeItem("loggedInUserName");
                    localStorage.removeItem("loggedInUserRole");
                    window.location.href = "/login";
                }); } }>Logout </button>
        </nav>
    );
}
export default NavigationBar;

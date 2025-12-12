import { useNavigate } from "react-router-dom";
import { logo } from "../assets/pictoplanner_logo.svg";

/* Component for the navigationbar for some of the sites */
function NavBarLayout()
{
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <img scr={logo} clasName="logo" />

            {/* ===== NavBar Buttons ===== */}
            <button onClick={() => navigate("/home")}>Hjem</button>

            <button onClick={() => navigate("/createPictogram")}>Opret Piktogram</button>

            <button onClick={() => navigate("/displayallpictograms")}>Alle Piktogrammer</button>
        </nav>
    );
}
export default NavBarLayout;
import { Outlet } from "react-router-dom";
import logo from "../assets/pictoplanner_logo.svg";

/* Component to show the logo on the public sites */
function PublicLogo() {
    return (
        <div className="public-layout">
            <img src={logo} className="logo public-logo" />
            <Outlet />
        </div>
    );
}
export default PublicLogo;

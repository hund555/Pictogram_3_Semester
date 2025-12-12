import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

/* A component for all the sites that has to show the NavigationBar */
function NavBarLayoutSites()
{
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
}
export default NavBarLayoutSites;
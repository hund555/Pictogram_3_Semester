import {Routes, Route } from "react-router-dom";
import LoginPage from "./UI/LoginPage";
import RegisterNewUser from "./UI/RegisterNewUser";
import './App.css'
import CreatePictogram from "./UI/CreatePictogram";
import Home from './UI/Home'
import DisplayAllPictograms from "./UI/DisplayAllPictograms";
import NavBarLayoutSites from "./UI/NavBarLayoutSites";
import PublicLogo from "./UI/PublicLogo";
import EditPictogram from "./UI/EditPictogram"

function App() {

    {/* SPA */}
    return (
        <>
            <Routes>
              {/* ===== Sites without navigationbar ===== */}
              <Route element={<PublicLogo />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registerUser" element={<RegisterNewUser />} />
              </Route>

              {/* ===== Sites with navigationbar ===== */}
              <Route element={<NavBarLayoutSites />}>
                <Route path="/" element={<Home />}/>
                <Route path="/createPictogram" element={<CreatePictogram />} />
                <Route path="/displayallpictograms" element={<DisplayAllPictograms />} />
                <Route path="/editpictogram" element={<EditPictogram/> }/>
              </Route>
            </Routes>
        </>           
    );
}
export default App

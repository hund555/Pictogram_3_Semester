import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginHomePage from "./UI/LoginHomePage";
import RegisterNewUser from "./UI/RegisterNewUser";
import './App.css'

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

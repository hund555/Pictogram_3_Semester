import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./UI/LoginPage";
import RegisterNewUser from "./UI/RegisterNewUser";
import './App.css'

function App() {

    {/* SPA */}
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registerUser" element={<RegisterNewUser />} />
            </Routes>
        </BrowserRouter>   
    );
}

export default App

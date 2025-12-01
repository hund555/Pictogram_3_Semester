import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WebUserService from "../Services/WebUserService";
import type UserDisplayInfo from "../Domain/UserDisplayInfo";

// Component for the Homepage with login and create new user
function LoginHomePage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [login, setLogin] = useState<UserDisplayInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigateToSite = useNavigate();

    // If 
    function handleLogin(event: React.FormEvent<HTMLFormElement>) 
    {
        event.preventDefault();
        if (email === "") 
        {
            return setError("E-mail skal udfyldes");
        }
        if (password === "") 
        {
            return setError("Password skal udfyldes");
        }
        setLoading(true);
        setError(null);

        console.log("logging in")
        WebUserService.login(email, password)
        .then((UserDisplayInfo) => {
            console.log("will i hit?")
            setLogin(UserDisplayInfo);
            navigateToSite("");
        })
        .catch(e => {
            setError(e.message)
            console.log("login failed")
        })
        .finally(() => {
            setLoading(false)
        })           
    }

    //When user presses "Opret Bruger" they are send to the Registration Form site
    function registerNewUser() {
        navigateToSite("/registerUser");
    }


    return (
        <div>
            <h1>PictoPlanner</h1>

            {/* ===== Input fields ===== */}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "0.5rem" }}>
                    <label style={{ marginRight: "0.5rem"}}>E-mailadresse</label>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label style={{ marginRight: "0.5rem" }}>Adgangskode</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* ===== Error handler ===== */}

                {error && <p className="error-message">{error}</p>}

                {/* ===== Buttons ===== */}

                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1rem"}}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Sender..." : "Login"}
                    </button>
                    <button onClick={registerNewUser}>Opret Bruger</button>
                </div>
            </form>
            
            <label >{login?.Name}</label>
            

            
        </div>
    )
}
export default LoginHomePage;
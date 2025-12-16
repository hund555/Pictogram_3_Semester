import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WebUserService from "../Services/WebUserService";
import NavigationBar from "./NavigationBar";
import type UserDisplayInfo from "../Domain/UserDisplayInfo";

// Component for the LoginPage with login and create new user
function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const emailRef = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigateToSite = useNavigate();

   //Sets Focus to the Email input field when rendered first time or remounted
    useEffect(() => {
        emailRef.current?.focus();
    }, []);


    // Checks if user input is empty. If not logs user into HomePage.
    function handleLogin(event: React.FormEvent<HTMLFormElement>) 
    {
        event.preventDefault();
        if (email === "") 
        {
            setError("E-mail skal udfyldes");
            emailRef.current?.focus();  //Sets focus again after input error
            return;
        }
        if (password === "") 
        {
            return setError("Password skal udfyldes");
        }
        setLoading(true);
        setError(null);

        WebUserService.login(email, password)
            .then((UserDisplayInfo) =>
            {
                console.log(UserDisplayInfo)
                localStorage.setItem("loggedInUserId", UserDisplayInfo.id);
                localStorage.setItem("loggedInUserEmail", UserDisplayInfo.email);
                localStorage.setItem("loggedInUserName", UserDisplayInfo.name);
                localStorage.setItem("loggedInUserRole", UserDisplayInfo.role);
                navigateToSite("/");
        })
        .catch(e => {
            setError(e.message)
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
                        ref={emailRef}
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
        </div>
    )
}
export default LoginPage;
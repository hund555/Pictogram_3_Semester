import { useState } from "react";

function LoginHomePage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


    function handleLogin() {
        if (email === "") {
            return setError("E-mail skal udfyldes");
        }
        else if (password === "") {
            return setError("Password skal udfyldes");
        }
        return setError(null);           
    }


    function registerNewUser() {

    }


    return (
        <div>
            <h1>PictoPlanner</h1>

            {/* ===== Input fields ===== */}

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
                <button onClick={handleLogin}>Log Ind</button>
                <button onClick={registerNewUser}>Opret Bruger</button>
            </div>
        </div>
    )
}
export default LoginHomePage;
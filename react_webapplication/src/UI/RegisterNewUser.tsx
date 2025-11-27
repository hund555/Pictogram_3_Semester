import { useState } from "react";
import { useNavigate } from "react-router-dom";
function RegisterNewUser() {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const navigateToSite = useNavigate();

    function handleCreateUser() {
        if (email.trim() === "" || password.trim() === "" || repeatPassword.trim() === "" || fullName.trim() === "") {
            setError("Alle Felter Skal Udfyldes");
            return
        }

        if (password.includes(" ") || repeatPassword.includes(" ")) {
            setError("Password må ikke indholde mellemrum");
            return;
        }
    }


    function handleCancelRegistration() {
        navigateToSite("/");
    }


    return (
        <div>
            <h1>PictoPlanner</h1>
            <h3>Udfyld formular</h3>

            {/* ===== Input fields ===== */}

            {/* Name field */}
            <div style={{ marginBottom: "0.5rem" }}>
                <label style={{ marginRight: "4.9rem" }}>Fulde Navn</label>
                <input type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>

            {/* E-mailaddress field */}
            <div style={{ marginBottom: "0.5rem" }}>
                <label style={{ marginRight: "3.9rem" }}>E-mailadresse</label>
                <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>


            {/* Password field */}
            <div style={{ marginBottom: "0.5rem" }}>
                <label style={{ marginRight: "3.9rem" }}>Adgangskode</label>
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {/* Password field */}
            <div style={{ marginBottom: "0.5rem" }}>
                <label style={{ marginRight: "0.5rem" }}>Gentag Adgangskode</label>
                <input type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
            </div>

            {/* ===== Error handler ===== */}

            {error && <p className="error-message">{error}</p>}

            {/* ===== Buttons ===== */}

            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1rem" }}>
                <button onClick={handleCreateUser}>Gem Bruger</button>
                <button onClick={handleCancelRegistration}>Annuller</button>
            </div>

        </div>
    )
}
export default RegisterNewUser;
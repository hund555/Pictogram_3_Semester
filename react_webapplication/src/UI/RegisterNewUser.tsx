import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type UserWeb from "../Domain/UserWeb";
import WebUserService from "../Services/WebUserService";

// Component for creating a new User
function RegisterNewUser() {
    const [name, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [createdUser, setCreatedUser] = useState<UserWeb | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigateToSite = useNavigate();

    // Handles user registration, validates input, calls the API and saves the returned UserWeb object
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (password.includes(" ") || repeatPassword.includes(" ")) {
            setError("Password må ikke indeholde mellemrum");
            return;
        }

        if (password !== repeatPassword) {
            setError("Password er ikke ens")
            return;
        }

        setLoading(true);
        setCreatedUser(null);

        WebUserService.createUser(name, email, password)
            .then((webUser) => {
                setCreatedUser(webUser);
                navigateToSite("/");
            })
            .catch(() => {
                setError("Kunne ikke oprette bruger. Prøv igen");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // If the user cancels registration they are sent back to the homepage
    function handleCancelRegistration() {
        navigateToSite("/");
    }

    return (
        {/* ===== JSX ===== */ }
        <div>
            <h1>PictoPlanner</h1>
            <h3>Udfyld formular</h3>

            {/* ===== Form And Input fields ===== */}
            <form onSubmit={handleSubmit}>

                {/* ===== Name field ===== */}
                <div style={{ marginBottom: "0.8rem" }}>
                    <label style={{ marginRight: "4.9rem" }}>
                        Fulde Navn
                    </label>
                    <input type="text"
                        minLength={2}
                        value={name}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                {/* ===== E-mailaddress field ===== */}
                <div style={{ marginBottom: "0.8rem" }}>
                    <label style={{ marginRight: "3.9rem" }}>
                        E-mailadresse
                    </label>
                    <input type="email"
                        minLength={3}
                        maxLength={320}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>


                {/* ===== Password field ===== */}
                <div style={{ marginBottom: "0.8rem" }}>
                    <label style={{ marginRight: "3.9rem" }}>
                        Adgangskode
                    </label>
                    <input type="password"
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* ===== Repeat password field ===== */}
                <div style={{ marginBottom: "0.5rem" }}>
                    <label style={{ marginRight: "0.5rem" }}>
                        Gentag Adgangskode
                    </label>
                    <input type="password"
                        minLength={8}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>

                {/* ===== Buttons ===== */}
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1rem" }}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Sender..." : "Opret Bruger"}
                    </button>

                    <button onClick={handleCancelRegistration}>
                        Annuller
                    </button>
                </div>
            </form>

            {/* ===== Error handler ===== */}

            {error && <p className="error-message">{error}</p>}

            {/* ===== If profile creation is a success, user data is shown ===== */}
            {createdUser && (
                <div>
                    <h2> BrugerProfil oprettet succesfuldt</h2>
                    <div>Fulde navn: {createdUser.fullName}</div>
                    <div>E-mail: {createdUser.email}</div>
                </div>
            )}
        </div>
    );
}
export default RegisterNewUser;
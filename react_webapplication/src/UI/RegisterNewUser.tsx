import { useState } from "react";

function RegisterNewUser() {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


    return (
        <div>
            <h1>PictoPlanner</h1>

            {/* ===== Input fields ===== */}




        </div>
    )
}
export default RegisterNewUser;
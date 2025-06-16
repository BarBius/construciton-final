import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './LoginForm.css';

const LoginForm = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleLoginSubmit = async (event) => {
event.preventDefault();
setLoading(true);
setSuccessMessage("");
setErrorMessage("");

try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    credentials: "include", 
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
    setSuccessMessage("Connexion réussie");

    setTimeout(() => {
        if (data.user.isAdmin) {
        navigate("/dashboard", { replace: true }); //  admin
        } else {
        navigate("/profile", { replace: true });   //  user
        }
    }, 1000);

    setEmail("");
    setPassword("");
    } else {
    setErrorMessage(data.error || "Erreur de connexion");
    }
} catch (error) {
    console.error(error);
    setErrorMessage("Erreur de connexion");
} finally {
    setLoading(false);
}
};

return (
<div className="login-form">
    {successMessage && <p className="success">{successMessage}</p>}
    {errorMessage && <p className="error">{errorMessage}</p>}

    <form onSubmit={handleLoginSubmit}>
    <div className="form-group1">
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
    <div className="form-group1">
        <label htmlFor="password">Mot de passe:</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </div>
    <input type="submit" value={loading ? "Chargement..." : "Se connecter"} disabled={loading} />
    </form>

    <div className="register-link">
    <p>Pas encore de compte ? <Link to="/register">S&rsquo;inscrire</Link></p>
    </div>
</div>
);
};

export default LoginForm;

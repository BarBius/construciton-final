import { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after logout
import "./Profile.css"; // Importation du CSS pour la mise en page

const Profil = () => {
    const [loading, setLoading] = useState(false); // État pour gérer l'état de chargement
    const [error, setError] = useState(""); // État pour les messages d'erreur
    const navigate = useNavigate(); // Navigation pour rediriger après la déconnexion

    // Logique pour gérer la déconnexion
    const handleLogout = async () => {
        setLoading(true);
        setError(""); // Reset error message

        try {
            const response = await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                credentials: "include", // Ensure cookies are sent for logout if necessary
            });

            if (response.ok) {
                localStorage.removeItem("authToken"); // Clear authentication token
                navigate("/login"); // Redirect to login page
            } else {
                setError("Erreur lors de la déconnexion. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            setError("Une erreur est survenue lors de la déconnexion.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profil">
            <h1>Page de profil</h1>

            {/* Logout Button */}
            <div className="button-container">
                <button className="logout-button" onClick={handleLogout} disabled={loading}>
                    {loading ? "Déconnexion en cours..." : "Se déconnecter"}
                </button>
            </div>

            {/* Error message */}
            {error && <div className="message error">{error}</div>}
        </div>
    );
};

export default Profil;



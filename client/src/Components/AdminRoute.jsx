import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
const [isAdmin, setIsAdmin] = useState(null);

useEffect(() => {
const checkAdmin = async () => {
    try {
    const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) return setIsAdmin(false);

    const data = await res.json();
    setIsAdmin(data.isAdmin === 1 || data.isAdmin === true);
    } catch (err) {
    setIsAdmin(false);
    }
};

checkAdmin();
}, []);

if (isAdmin === null) return <div>Checking admin access...</div>;
return isAdmin ? children : <Navigate to="/profile" replace />;
};

AdminRoute.propTypes = {
children: PropTypes.node.isRequired,
};

export default AdminRoute;

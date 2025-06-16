import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // ✅ обязательно

const ProtectedRoute = ({ children }) => {
const [auth, setAuth] = useState(null);

useEffect(() => {
const checkAuth = async () => {
    try {
    const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'GET',
        credentials: 'include', // отправляем cookie
    });

    setAuth(response.ok);
    } catch (err) {
    setAuth(false);
    }
};

checkAuth();
}, []);

if (auth === null) return <div>Checking authentication...</div>;
return auth ? children : <Navigate to="/login" />;
};

// ✅ пропсы
ProtectedRoute.propTypes = {
children: PropTypes.node.isRequired
};

export default ProtectedRoute;

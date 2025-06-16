// src/Components/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers = async () => {
try {
    const response = await fetch("http://localhost:5000/api/users", {
    credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    setUsers(data);
} catch (err) {
    setError("Unable to load users.");
}
};

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async () => {
setLoading(true);
setMessage("");
setError("");

const method = selectedUser ? "PUT" : "POST";
const url = selectedUser
    ? `http://localhost:5000/api/users/${selectedUser.id}`
    : `http://localhost:5000/api/users/register`;

const payload = selectedUser
    ? {
        username: formData.name,
        email: formData.email,
        isAdmin: false,
    }
    : {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: false,
    };

try {
    const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to save user");

    setMessage(selectedUser ? "User updated successfully." : "User created successfully.");
    setFormData({ name: "", email: "", phone: "", password: "" });
    setSelectedUser(null);
    fetchUsers();
} catch (err) {
    setError(err.message);
} finally {
    setLoading(false);
}
};

const handleEdit = (user) => {
setSelectedUser(user);
setFormData({
    name: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    password: "", // не редактируем
});
setMessage("");
setError("");
};

const handleDelete = async (id) => {
if (!window.confirm("Are you sure you want to delete this user?")) return;

setLoading(true);
setMessage("");
setError("");

try {
    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to delete user");

    setMessage(`User deleted successfully.`);
    fetchUsers();
} catch (err) {
    setError(err.message);
} finally {
    setLoading(false);
}
};

const handleCancelEdit = () => {
setSelectedUser(null);
setFormData({ name: "", email: "", phone: "", password: "" });
setMessage("");
setError("");
};


const handleLogout = async () => {
try {
    const response = await fetch("http://localhost:5000/api/users/logout", {
    method: "POST",
    credentials: "include",
    });

    if (response.ok) {
    navigate("/login");
    } else {
    setError("Failed to log out. Please try again.");
    }
} catch (error) {
    console.error("Logout error:", error);
    setError("An error occurred during logout.");
}
};

return (
<div className="dashboard">
    <h1>Admin Dashboard</h1>

    <div className="form-section">
    <h2>{selectedUser ? "Edit User" : "Create User"}</h2>
    <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
    />
    <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
    />
    <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleInputChange}
    />
    {!selectedUser && (
        <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        />
    )}
    <div className="form-buttons">
        <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : selectedUser ? "Update User" : "Create User"}
        </button>
        {selectedUser && (
        <button onClick={handleCancelEdit} className="cancel-button">
            Cancel
        </button>
        )}
    </div>
    </div>

    <hr />

    <div className="user-list">
    <h2>All Users</h2>
    <ul>
        {users.map((user) => (
        <li key={user.id}>
            <strong>{user.username}</strong> | {user.email} | {user.phone}
            <div className="user-actions">
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
        </li>
        ))}
    </ul>
    </div>

    {message && <p className="message success">{message}</p>}
    {error && <p className="message error">{error}</p>}

    <div className="button-container">
    <button onClick={handleLogout} className="logout-button">
        Logout
    </button>
    </div>
</div>
);
};

export default Dashboard;


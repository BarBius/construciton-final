import { useState } from 'react';
import './Register.css'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted'); 

        // Front validation
        if (!username || username.trim().length < 3) {
            setError('Username must be at least 3 characters long and not contain only spaces');
            setMessage('');
            return;
        }

        if (password.trim().length < 6) {
            setError('Password must be at least 6 characters long and not contain only spaces');
            setMessage('');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email');
            setMessage('');
            return;
        }

        // Reset messages and show loading indicator
        setError('');
        setMessage('');
        setLoading(true);

           // Log the payload
    console.log('Payload being sent:', {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
    });

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                    password: password.trim(),
                }),
            });

            const data = await response.json();
            console.log('Response from server:', data); // Log server response

            if (response.ok) {
                setMessage(data.message || 'Registration successful!');
                setError('');
                // Clear form fields after successful registration
                setUsername('');
                setEmail('');
                setPassword('');

                // Clear messages after 5 seconds
                setTimeout(() => {
                    setMessage('');
                    setError('');
                }, 5000);
            } else {
                // Handle server error messages
                setError(data.error || 'Failed to register. Please try again.');
                setMessage('');
            }
        } catch (err) {
            // Handle network or unexpected errors
            console.error('Error during registration:', err); // Log error for debugging
            setError('Error registering user. Please try again later.');
            setMessage('');
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Register;

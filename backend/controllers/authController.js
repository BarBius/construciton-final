import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/userModels.js';

const { compare } = bcrypt;
const { sign } = jwt;

const AuthController = {
// Register a new user
register: async (req, res) => {
try {
    const { username, email, password, isAdmin = false } = req.body;

    // Validate input
    const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ username, email, password });
    if (error) {
    return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser.length > 0) {
    return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(username, email, hashedPassword, isAdmin);

    res.status(201).json({ message: 'User registered successfully!' });
} catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).json({ error: 'Failed to register user' });
}
},

// Login user + set cookie
login: async (req, res) => {
try {
    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = await User.findByEmail(email);
    if (users.length === 0) {
    return res.status(404).json({ error: 'No account associated with this email' });
    }

    const user = users[0];
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    );

    // ✅ Save token in HTTP-only cookie
    res.cookie('token', token, {
    httpOnly: true,
    secure: false, // true if using HTTPS
    sameSite: 'Lax',
    maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({
    message: 'Login successful',
    user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    });
} catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ error: 'Failed to log in' });
}
},
};

export default AuthController;

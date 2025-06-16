import dotenv from 'dotenv';
dotenv.config();  // Load .env variables

// Ensure necessary environment variables are set
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME || !process.env.PORT) {
    console.error('Error: Missing necessary environment variables!');
    process.exit(1);  // Exit the application if environment variables are missing
}

// Check if the environment variables are loaded properly
console.log('Database Host:', process.env.DB_HOST);
console.log('Database User:', process.env.DB_USER);
console.log('Database Name:', process.env.DB_NAME);
console.log('Server Port:', process.env.PORT);

// Import dependencies
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // ✅ Добавлено
import devisRoutes from './routes/devisRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); // ✅ Подключено

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/devis', devisRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

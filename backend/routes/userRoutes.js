import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import UserController from '../controllers/userController.js';

const router = express.Router();

// Admin only
router.get('/', verifyToken, isAdmin, UserController.getAllUsers);

// User profile
router.get('/profile', verifyToken, UserController.getProfile);

// Register user
router.post('/register', UserController.registerUser);

// Update user
router.put('/:id', UserController.updateUser);

// Delete user
router.delete('/:id', UserController.deleteUser);

// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie("token"); // У тебя токен называется token, не authToken
    res.status(200).json({ message: "Logged out successfully" });
});

export default router;

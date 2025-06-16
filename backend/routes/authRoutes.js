import { Router } from 'express';
import AuthController from '../controllers/authController.js';
const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', (req, res) => {
  res.clearCookie("token"); // Удаляем токен из куки
res.status(200).json({ message: "Logged out successfully" });
});


export default router;

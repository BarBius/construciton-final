import jwt from 'jsonwebtoken';

// ✅ Проверка авторизации по токену (из куки)
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 🧠 теперь user доступен в любом роуте
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// ✅ Проверка, админ ли пользователь
export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.isAdmin !== 1) {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
};

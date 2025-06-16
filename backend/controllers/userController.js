import User from '../models/userModels.js'; // Импорт модели пользователя

// Деструктуризация методов из модели
const { getAll, update, delete: deleteUser, create } = User;

const UserController = {
    // ✅ Профиль пользователя (доступен после verifyToken)
    getProfile: async (req, res) => {
        try {
            res.json(req.user); // req.user добавляется в verifyToken
        } catch (err) {
            console.error('Error getting profile:', err.message);
            res.status(500).json({ error: 'Failed to get profile' });
        }
    },

    // ✅ Получение всех пользователей (доступ только для админа)
    getAllUsers: async (req, res) => {
        try {
            const users = await getAll();
            res.json(users);
        } catch (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    },

    // ✅ Регистрация нового пользователя
    registerUser: async (req, res) => {
        const { username, email, password } = req.body;

        // Проверка ввода
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            await create(username, email, password);
            res.status(201).json({ message: 'User registered successfully!' });
        } catch (err) {
            console.error('Error registering user:', err.message);
            res.status(500).json({ error: err.message || 'Failed to register user' });
        }
    },

    // ✅ Обновление пользователя
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { username, email } = req.body;

        if (!id || !username || !email) {
            return res.status(400).json({ error: 'ID, username, and email are required' });
        }

        try {
            await update(id, username, email);
            res.json({ message: 'User updated successfully' });
        } catch (err) {
            console.error('Error updating user:', err.message);
            res.status(500).json({ error: 'Failed to update user' });
        }
    },

    // ✅ Удаление пользователя
    deleteUser: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        try {
            await deleteUser(id);
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error deleting user:', err.message);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
};

export default UserController;

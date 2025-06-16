import db from '../db/connection.js';

const User = {
// Create a new user
create: async (username, email, hashedPassword, isAdmin = false) => {
try {
    console.log('Creating user with data:', { username, email, hashedPassword, isAdmin });

    if (!username || !email || !hashedPassword) {
    throw new Error('All fields are required');
    }

    // Insert into DB
    const sql = 'INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [username, email, hashedPassword, isAdmin]);

    console.log('User successfully inserted with ID:', result.insertId);
    return { id: result.insertId, username, email, isAdmin };
} catch (err) {
    console.error('Error in create():', err.message);
    throw new Error('User creation failed');
}
},

// Find user by email
findByEmail: async (email) => {
try {
    if (!email) throw new Error('Email is required');

    const sql = 'SELECT * FROM users WHERE LOWER(email) = LOWER(?)';
    const [rows] = await db.execute(sql, [email]);

    return rows;
} catch (err) {
    console.error('Error in findByEmail():', err.message);
    throw new Error('Failed to fetch user');
}
},

// Optional: Update user
update: async (id, username, email, isAdmin = false) => {
try {
    const sql = 'UPDATE users SET username = ?, email = ?, isAdmin = ? WHERE id = ?';
    await db.execute(sql, [username, email, isAdmin, id]);
    return { id, username, email, isAdmin };
} catch (err) {
    console.error('Error in update():', err.message);
    throw new Error('User update failed');
}
},

// Get all users
getAll: async () => {
try {
const sql = 'SELECT * FROM users';
const [rows] = await db.execute(sql);
return rows;
} catch (err) {
console.error('Error in getAll():', err.message);
throw new Error('Failed to fetch users');
}
},


// Optional: Delete user
delete: async (id) => {
try {
    const sql = 'DELETE FROM users WHERE id = ?';
    await db.execute(sql, [id]);
    return { id };
} catch (err) {
    console.error('Error in delete():', err.message);
    throw new Error('User deletion failed');
}
}
};

export default User;

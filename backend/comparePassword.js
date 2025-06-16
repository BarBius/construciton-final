import bcrypt from 'bcryptjs'; // Import bcryptjs as default

const rawPassword = 'hope123'; // The password you entered during registration
const storedHash = '$2a$10$Im5VyITMECMvkr3S5Ln25OobDIY56DBPvRjt0sw36qBnuJT1sPoB6'; // Replace with the actual hash from your database

// Compare the raw password with the stored hash
bcrypt.compare(rawPassword, storedHash, (err, result) => {
    if (err) {
        console.error('Error comparing passwords:', err);
    } else {
        console.log('Password comparison result:', result); // true if they match, false otherwise
    }
});

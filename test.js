const bcrypt = require('bcrypt');
const { User } = require('./models'); // Sequelize User model



async function updatePassword(email, plainTextPassword) {
    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

        // Update the user's password in the database
        await User.update(
            { password: hashedPassword },
            { where: { email: email } }
        );

        console.log('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error);
    }
}


updatePassword('sindhu@example.com', 'new1');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await User.create({ ...userData, password: hashedPassword });
};

const login = async (email, password) => {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('User not found');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid password');

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    return {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) throw new Error('La contraseña actual es incorrecta');

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(userId, hashedNewPassword);
};

const deleteAccount = async (userId) => {
    await User.delete(userId);
};

module.exports = {
    register,
    login,
    changePassword,
    deleteAccount
};

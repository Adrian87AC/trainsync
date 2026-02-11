const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const id = await authService.register(req.body);
        res.json({ success: true, id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authService.login(email, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        await authService.changePassword(req.user.id, oldPassword, newPassword);
        res.json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        await authService.deleteAccount(req.user.id);
        res.json({ success: true, message: 'Cuenta eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register,
    login,
    changePassword,
    deleteAccount
};

const User = require('../models/User');

const getAllUsers = async () => {
    return await User.findAllWithTrainer();
};

const updateUser = async (id, userData) => {
    await User.update(id, userData);
};

const deleteUser = async (id) => {
    await User.delete(id);
};

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser
};

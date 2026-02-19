const Usuario = require('../models/Usuario');

const obtenerTodosUsuarios = async () => {
    return await Usuario.obtenerTodos();
};

module.exports = {
    obtenerTodosUsuarios
};

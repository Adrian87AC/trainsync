const servicioUsuario = require('../services/servicioUsuario');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await servicioUsuario.obtenerTodosUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    obtenerUsuarios
};

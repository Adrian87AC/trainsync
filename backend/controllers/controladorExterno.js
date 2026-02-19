const servicioEjercicioExterno = require('../services/servicioEjercicioExterno');

const obtenerEjerciciosExternos = async (req, res) => {
    try {
        const ejercicios = await servicioEjercicioExterno.obtenerEjerciciosExternos();
        res.json(ejercicios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerEjerciciosExternos
};

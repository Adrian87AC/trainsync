const servicioEjercicio = require('../services/servicioEjercicio');

const obtenerEjercicios = async (req, res) => {
    try {
        const ejercicios = await servicioEjercicio.obtenerTodosEjercicios();
        res.json(ejercicios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const agregarEjercicio = async (req, res) => {
    try {
        const id = await servicioEjercicio.crearEjercicio(req.body);
        res.json({ success: true, id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const actualizarCompletado = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await servicioEjercicio.actualizarCompletado(id, completed);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const actualizarNotas = async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;
        await servicioEjercicio.actualizarNotas(id, notes);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    obtenerEjercicios,
    agregarEjercicio,
    actualizarCompletado,
    actualizarNotas
};

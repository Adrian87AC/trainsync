const servicioRutina = require('../services/servicioRutina');

const obtenerRutinas = async (req, res) => {
    try {
        const rutinas = await servicioRutina.obtenerTodasRutinas();
        res.json(rutinas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const agregarRutina = async (req, res) => {
    try {
        const id = await servicioRutina.crearRutina(req.body);
        res.json({ success: true, id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    obtenerRutinas,
    agregarRutina
};

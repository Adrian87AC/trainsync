const Ejercicio = require('../models/Ejercicio');

const obtenerTodosEjercicios = async () => {
    return await Ejercicio.obtenerTodos();
};

const crearEjercicio = async (datosEjercicio) => {
    return await Ejercicio.crear(datosEjercicio);
};

const actualizarCompletado = async (id, completado) => {
    await Ejercicio.actualizarCompletado(id, completado);
};

const actualizarNotas = async (id, notas) => {
    await Ejercicio.actualizarNotas(id, notas);
};

module.exports = {
    obtenerTodosEjercicios,
    crearEjercicio,
    actualizarCompletado,
    actualizarNotas
};

const Rutina = require('../models/Rutina');
const Ejercicio = require('../models/Ejercicio');

const obtenerTodasRutinas = async () => {
    const rutinas = await Rutina.obtenerTodos();

    for (let rutina of rutinas) {
        const dias = await Rutina.obtenerDiasPorRutina(rutina.id);
        rutina.days = dias;

        for (let dia of rutina.days) {
            const ejercicios = await Ejercicio.obtenerDetallesPorDia(dia.id);

            dia.exercises = ejercicios.map(ej => ({
                id: ej.id,
                exerciseId: ej.exercise_id,
                name: ej.name,
                muscleGroup: ej.muscle_group,
                videoUrl: ej.video_url,
                sets: ej.sets,
                reps: ej.reps,
                weight: ej.weight,
                completed: !!ej.completed,
                notes: ej.notes
            }));
        }
    }
    return rutinas;
};

const crearRutina = async (datosRutina) => {
    const { days } = datosRutina;
    const rutinaId = await Rutina.crear(datosRutina);

    for (let dia of days) {
        const diaId = await Rutina.agregarDia(rutinaId, dia.dayName);

        for (let ejercicio of dia.exercises) {
            await Ejercicio.agregarDetalle(diaId, ejercicio);
        }
    }
    return rutinaId;
};

module.exports = {
    obtenerTodasRutinas,
    crearRutina
};

const db = require('../db');

class Ejercicio {
    static async obtenerTodos() {
        const [rows] = await db.query('SELECT * FROM exercises');
        return rows;
    }

    static async crear(data) {
        const { name, muscle_group, video_url } = data;
        const [result] = await db.query(
            'INSERT INTO exercises (name, muscle_group, video_url) VALUES (?, ?, ?)',
            [name, muscle_group, video_url]
        );
        return result.insertId;
    }

    static async actualizarCompletado(id, completado) {
        return await db.query('UPDATE exercise_details SET completed = ? WHERE id = ?', [completado, id]);
    }

    static async actualizarNotas(id, notas) {
        return await db.query('UPDATE exercise_details SET notes = ? WHERE id = ?', [notas, id]);
    }

    static async obtenerDetallesPorDia(diaId) {
        const [rows] = await db.query(`
            SELECT ed.*, e.name, e.muscle_group, e.video_url 
            FROM exercise_details ed 
            JOIN exercises e ON ed.exercise_id = e.id 
            WHERE ed.routine_day_id = ?`, [diaId]);
        return rows;
    }

    static async agregarDetalle(diaId, datosEjercicio) {
        return await db.query(
            'INSERT INTO exercise_details (routine_day_id, exercise_id, sets, reps, weight) VALUES (?, ?, ?, ?, ?)',
            [diaId, datosEjercicio.exerciseId, datosEjercicio.sets, datosEjercicio.reps, datosEjercicio.weight || 0]
        );
    }
}

module.exports = Ejercicio;

const db = require('../db');

class Exercise {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM exercises');
        return rows;
    }

    static async create(data) {
        const { name, muscle_group, video_url } = data;
        const [result] = await db.query(
            'INSERT INTO exercises (name, muscle_group, video_url) VALUES (?, ?, ?)',
            [name, muscle_group, video_url]
        );
        return result.insertId;
    }

    static async updateCompletion(id, completed) {
        return await db.query('UPDATE exercise_details SET completed = ? WHERE id = ?', [completed, id]);
    }

    static async updateNotes(id, notes) {
        return await db.query('UPDATE exercise_details SET notes = ? WHERE id = ?', [notes, id]);
    }

    static async findDetailsByDayId(dayId) {
        const [rows] = await db.query(`
            SELECT ed.*, e.name, e.muscle_group, e.video_url 
            FROM exercise_details ed 
            JOIN exercises e ON ed.exercise_id = e.id 
            WHERE ed.routine_day_id = ?`, [dayId]);
        return rows;
    }

    static async addDetail(dayId, exerciseData) {
        return await db.query(
            'INSERT INTO exercise_details (routine_day_id, exercise_id, sets, reps, weight) VALUES (?, ?, ?, ?, ?)',
            [dayId, exerciseData.exerciseId, exerciseData.sets, exerciseData.reps, exerciseData.weight || 0]
        );
    }
}

module.exports = Exercise;

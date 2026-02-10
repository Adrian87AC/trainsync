const db = require('../db');

class Routine {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM routines');
        return rows;
    }

    static async create(data) {
        const { name, client_id, trainer_id } = data;
        const [result] = await db.query(
            'INSERT INTO routines (name, client_id, trainer_id) VALUES (?, ?, ?)',
            [name, client_id, trainer_id]
        );
        return result.insertId;
    }

    static async findDaysByRoutineId(routineId) {
        const [rows] = await db.query('SELECT * FROM routine_days WHERE routine_id = ?', [routineId]);
        return rows;
    }

    static async addDay(routineId, dayName) {
        const [result] = await db.query(
            'INSERT INTO routine_days (routine_id, day_name) VALUES (?, ?)',
            [routineId, dayName]
        );
        return result.insertId;
    }
}

module.exports = Routine;

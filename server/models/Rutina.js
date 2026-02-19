const db = require('../db');

class Rutina {
    static async obtenerTodos() {
        const [rows] = await db.query('SELECT * FROM routines');
        return rows;
    }

    static async crear(data) {
        const { name, client_id, trainer_id } = data;
        const [result] = await db.query(
            'INSERT INTO routines (name, client_id, trainer_id) VALUES (?, ?, ?)',
            [name, client_id, trainer_id]
        );
        return result.insertId;
    }

    static async obtenerDiasPorRutina(rutinaId) {
        const [rows] = await db.query('SELECT * FROM routine_days WHERE routine_id = ?', [rutinaId]);
        return rows;
    }

    static async agregarDia(rutinaId, nombreDia) {
        const [result] = await db.query(
            'INSERT INTO routine_days (routine_id, day_name) VALUES (?, ?)',
            [rutinaId, nombreDia]
        );
        return result.insertId;
    }
}

module.exports = Rutina;

const db = require('../db');

class Usuario {
    static async obtenerTodos() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async obtenerPorRol(rol) {
        const [rows] = await db.query('SELECT * FROM users WHERE role = ?', [rol]);
        return rows;
    }
}

module.exports = Usuario;

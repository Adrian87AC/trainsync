const db = require('../db');

class User {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByRole(role) {
        const [rows] = await db.query('SELECT * FROM users WHERE role = ?', [role]);
        return rows;
    }
}

module.exports = User;

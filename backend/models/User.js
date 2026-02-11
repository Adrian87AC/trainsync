const db = require('../db');

class User {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(userData) {
        const { name, email, password, role, trainer_id } = userData;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role, trainer_id) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, role || 'client', trainer_id || null]
        );
        return result.insertId;
    }

    static async update(id, userData) {
        const { name, email, role, trainer_id } = userData;
        await db.query(
            'UPDATE users SET name = ?, email = ?, role = ?, trainer_id = ? WHERE id = ?',
            [name, email, role, trainer_id || null, id]
        );
    }

    static async updatePassword(id, hashedPassword) {
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }

    static async findAllWithTrainer() {
        const [rows] = await db.query(`
            SELECT u.id, u.name, u.email, u.role, u.trainer_id, u2.name as trainer_name 
            FROM users u 
            LEFT JOIN users u2 ON u.trainer_id = u2.id
        `);
        return rows;
    }
}

module.exports = User;

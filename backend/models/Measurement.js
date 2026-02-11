const db = require('../db');

class Measurement {
    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC', [userId]);
        return rows;
    }

    static async create(measurementData) {
        const { user_id, weight, height, body_fat, chest, waist, hips, date } = measurementData;
        const [result] = await db.query(
            'INSERT INTO measurements (user_id, weight, height, body_fat, chest, waist, hips, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, weight, height, body_fat, chest, waist, hips, date || new Date().toISOString().split('T')[0]]
        );
        return result.insertId;
    }
}

module.exports = Measurement;

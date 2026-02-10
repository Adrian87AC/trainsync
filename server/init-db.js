const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function initDB() {
    try {
        // Connect to MySQL server (without database selected first)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        console.log('Connected to MySQL server.');

        // Read schema file
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        // Split by semicolon to get individual queries (basic splitting)
        const queries = schema.split(';').filter(q => q.trim() !== '');

        for (const query of queries) {
            if (query.trim()) {
                await connection.query(query);
                console.log('Executed query.');
            }
        }

        // Seed Users with hashed passwords
        const users = [
            { id: 1, name: 'Admin', email: 'admin@trainsync.com', password: 'admin123', role: 'admin', trainer_id: null },
            { id: 2, name: 'Coach Carlos', email: 'carlos@trainsync.com', password: 'coach123', role: 'trainer', trainer_id: null },
            { id: 3, name: 'María López', email: 'maria@example.com', password: 'client123', role: 'client', trainer_id: 2 },
            { id: 4, name: 'Juan Pérez', email: 'juan@example.com', password: 'client123', role: 'client', trainer_id: 2 }
        ];

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await connection.query(
                'INSERT INTO users (id, name, email, password, role, trainer_id) VALUES (?, ?, ?, ?, ?, ?)',
                [user.id, user.name, user.email, hashedPassword, user.role, user.trainer_id]
            );
        }

        // Seed Exercises
        const exercises = [
            [1, 'Press Banca', 'Pecho', 'https://youtube.com/...'],
            [2, 'Sentadilla', 'Piernas', 'https://youtube.com/...'],
            [3, 'Peso Muerto', 'Espalda', 'https://youtube.com/...'],
            [4, 'Press Militar', 'Hombros', 'https://youtube.com/...'],
            [5, 'Dominadas', 'Espalda', 'https://youtube.com/...'],
            [6, 'Curl Bíceps', 'Brazos', 'https://youtube.com/...']
        ];
        for (const ex of exercises) {
            await connection.query('INSERT INTO exercises (id, name, muscle_group, video_url) VALUES (?, ?, ?, ?)', ex);
        }

        // Seed Routines
        await connection.query('INSERT INTO routines (id, name, client_id, trainer_id) VALUES (1, "Hipertrofia Base", 3, 2)');
        await connection.query('INSERT INTO routines (id, name, client_id, trainer_id) VALUES (2, "Fuerza General", 4, 2)');

        // Seed Routine Days
        await connection.query('INSERT INTO routine_days (id, routine_id, day_name) VALUES (1, 1, "Lunes - Pecho y Tríceps")');
        await connection.query('INSERT INTO routine_days (id, routine_id, day_name) VALUES (2, 1, "Miércoles - Piernas")');
        await connection.query('INSERT INTO routine_days (id, routine_id, day_name) VALUES (3, 2, "Martes - Full Body")');

        // Seed Exercise Details
        const details = [
            [1, 1, 4, '8-10', 60, true, 'Sentí buen bombeo'],
            [1, 4, 3, '10-12', 40, true, ''],
            [2, 2, 4, '6-8', 100, false, ''],
            [2, 3, 3, '8-10', 120, false, ''],
            [3, 2, 5, '5', 140, true, 'PR!'],
            [3, 5, 3, '6-8', 0, false, ''],
            [3, 6, 3, '10', 15, false, '']
        ];
        for (const d of details) {
            await connection.query('INSERT INTO exercise_details (routine_day_id, exercise_id, sets, reps, weight, completed, notes) VALUES (?, ?, ?, ?, ?, ?, ?)', d);
        }

        console.log('Database, users, and data initialized successfully.');
        await connection.end();
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initDB();

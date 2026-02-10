const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
};

// --- AUTH ENDPOINTS ---

app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, role, trainer_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role, trainer_id) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'client', trainer_id || null]
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Change password
app.put('/api/auth/change-password', authenticateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const [users] = await db.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
        if (users.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(oldPassword, users[0].password);
        if (!validPassword) return res.status(400).json({ error: 'La contraseña actual es incorrecta' });

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, req.user.id]);

        res.json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete account (for the user themselves)
app.delete('/api/auth/delete-account', authenticateToken, async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.user.id]);
        res.json({ success: true, message: 'Cuenta eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ADMIN ENDPOINTS ---

// Get all users (for admin)
app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT u.id, u.name, u.email, u.role, u.trainer_id, u2.name as trainer_name 
            FROM users u 
            LEFT JOIN users u2 ON u.trainer_id = u2.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user (admin)
app.put('/api/admin/users/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, email, role, trainer_id } = req.body;
    try {
        await db.query(
            'UPDATE users SET name = ?, email = ?, role = ?, trainer_id = ? WHERE id = ?',
            [name, email, role, trainer_id || null, id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user (admin)
app.delete('/api/admin/users/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Users
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, role, trainer_id FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Exercises
app.get('/api/exercises', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM exercises');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Routines
app.get('/api/routines', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM routines');

        // Fetch details for each routine
        for (let routine of rows) {
            const [days] = await db.query('SELECT * FROM routine_days WHERE routine_id = ?', [routine.id]);
            routine.days = days;

            for (let day of routine.days) {
                const [exercises] = await db.query(`
                    SELECT ed.*, e.name, e.muscle_group, e.video_url 
                    FROM exercise_details ed 
                    JOIN exercises e ON ed.exercise_id = e.id 
                    WHERE ed.routine_day_id = ?`, [day.id]);
                day.exercises = exercises.map(ex => ({
                    id: ex.id,
                    exerciseId: ex.exercise_id,
                    name: ex.name,
                    muscleGroup: ex.muscle_group,
                    videoUrl: ex.video_url,
                    sets: ex.sets,
                    reps: ex.reps,
                    weight: ex.weight,
                    completed: !!ex.completed,
                    notes: ex.notes
                }));
            }
        }
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new routine
app.post('/api/routines', async (req, res) => {
    const { name, client_id, trainer_id, days } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO routines (name, client_id, trainer_id) VALUES (?, ?, ?)',
            [name, client_id, trainer_id]
        );
        const routineId = result.insertId;

        for (let day of days) {
            const [dayResult] = await db.query(
                'INSERT INTO routine_days (routine_id, day_name) VALUES (?, ?)',
                [routineId, day.dayName]
            );
            const dayId = dayResult.insertId;

            for (let exercise of day.exercises) {
                await db.query(
                    'INSERT INTO exercise_details (routine_day_id, exercise_id, sets, reps, weight) VALUES (?, ?, ?, ?, ?)',
                    [dayId, exercise.exerciseId, exercise.sets, exercise.reps, exercise.weight || 0]
                );
            }
        }
        res.json({ success: true, id: routineId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new exercise
app.post('/api/exercises', async (req, res) => {
    const { name, muscle_group, video_url } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO exercises (name, muscle_group, video_url) VALUES (?, ?, ?)',
            [name, muscle_group, video_url]
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update exercise completion status
app.put('/api/completion/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        await db.query('UPDATE exercise_details SET completed = ? WHERE id = ?', [completed, id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update exercise notes
app.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { notes } = req.body;
    try {
        await db.query('UPDATE exercise_details SET notes = ? WHERE id = ?', [notes, id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- MEASUREMENTS ENDPOINTS ---

// Get measurements for a user
app.get('/api/measurements/:userId', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC', [req.params.userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new measurement
app.post('/api/measurements', authenticateToken, async (req, res) => {
    const { user_id, weight, height, body_fat, chest, waist, hips, date } = req.body;
    try {
        await db.query(
            'INSERT INTO measurements (user_id, weight, height, body_fat, chest, waist, hips, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, weight, height, body_fat, chest, waist, hips, date || new Date().toISOString().split('T')[0]]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Users
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

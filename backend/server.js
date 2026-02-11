const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const routineRoutes = require('./routes/routineRoutes');
const measurementRoutes = require('./routes/measurementRoutes');
const externalRoutes = require('./routes/externalRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/external', externalRoutes);

// Legacy/Compatibility routes (optional, but good for keeping frontend working while refactoring)
const exerciseController = require('./controllers/exerciseController');
app.put('/api/completion/:id', exerciseController.updateCompletion);
app.put('/api/notes/:id', exerciseController.updateNotes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

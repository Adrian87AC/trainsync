const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const routineRoutes = require('./routes/routineRoutes');
const externalRoutes = require('./routes/externalRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/external', externalRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'TrainSync Server is running' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

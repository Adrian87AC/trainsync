const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const rutasUsuario = require('./routes/rutasUsuario');
const rutasEjercicio = require('./routes/rutasEjercicio');
const rutasRutina = require('./routes/rutasRutina');
const rutasExterno = require('./routes/rutasExterno');

// Usar rutas
app.use('/api/users', rutasUsuario);
app.use('/api/exercises', rutasEjercicio);
app.use('/api/routines', rutasRutina);
app.use('/api/external', rutasExterno);

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'TrainSync Server is running' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

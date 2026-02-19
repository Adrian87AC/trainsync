const express = require('express');
const router = express.Router();
const controladorExterno = require('../controllers/controladorExterno');

router.get('/ejercicios', controladorExterno.obtenerEjerciciosExternos);

module.exports = router;

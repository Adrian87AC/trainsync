const express = require('express');
const router = express.Router();
const controladorEjercicio = require('../controllers/controladorEjercicio');

router.get('/', controladorEjercicio.obtenerEjercicios);
router.post('/', controladorEjercicio.agregarEjercicio);
router.put('/completion/:id', controladorEjercicio.actualizarCompletado);
router.put('/notes/:id', controladorEjercicio.actualizarNotas);

module.exports = router;

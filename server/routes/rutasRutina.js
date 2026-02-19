const express = require('express');
const router = express.Router();
const controladorRutina = require('../controllers/controladorRutina');

router.get('/', controladorRutina.obtenerRutinas);
router.post('/', controladorRutina.agregarRutina);

module.exports = router;

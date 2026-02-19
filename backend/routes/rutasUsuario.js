const express = require('express');
const router = express.Router();
const controladorUsuario = require('../controllers/controladorUsuario');

router.get('/', controladorUsuario.obtenerUsuarios);

module.exports = router;

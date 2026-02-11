const express = require('express');
const router = express.Router();
const externalController = require('../controllers/externalController');

// This will be mapped to /api/externals automatically by our dynamic loader
router.get('/exercises', externalController.getExternalExercises);

module.exports = router;

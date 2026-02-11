const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');
const { authenticateToken } = require('../middleware/auth');

router.get('/:userId', authenticateToken, measurementController.getMeasurements);
router.post('/', authenticateToken, measurementController.addMeasurement);

module.exports = router;

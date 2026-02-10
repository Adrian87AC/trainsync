const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/', exerciseController.getExercises);
router.post('/', exerciseController.addExercise);
router.put('/completion/:id', exerciseController.updateCompletion);
router.put('/notes/:id', exerciseController.updateNotes);

module.exports = router;

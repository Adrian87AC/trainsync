const exerciseService = require('../services/exerciseService');

const getExercises = async (req, res) => {
    try {
        const exercises = await exerciseService.getAllExercises();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addExercise = async (req, res) => {
    try {
        const id = await exerciseService.createExercise(req.body);
        res.json({ success: true, id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCompletion = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await exerciseService.updateCompletion(id, completed);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;
        await exerciseService.updateNotes(id, notes);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getExercises,
    addExercise,
    updateCompletion,
    updateNotes
};

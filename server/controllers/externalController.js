const externalExerciseService = require('../services/externalExerciseService');

const getExternalExercises = async (req, res) => {
    try {
        const exercises = await externalExerciseService.fetchExternalExercises();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getExternalExercises
};

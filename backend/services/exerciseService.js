const Exercise = require('../models/Exercise');

const getAllExercises = async () => {
    return await Exercise.findAll();
};

const createExercise = async (exerciseData) => {
    return await Exercise.create(exerciseData);
};

const updateCompletion = async (id, completed) => {
    await Exercise.updateCompletion(id, completed);
};

const updateNotes = async (id, notes) => {
    await Exercise.updateNotes(id, notes);
};

module.exports = {
    getAllExercises,
    createExercise,
    updateCompletion,
    updateNotes
};

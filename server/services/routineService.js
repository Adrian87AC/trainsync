const Routine = require('../models/Routine');
const Exercise = require('../models/Exercise');

const getAllRoutines = async () => {
    const routines = await Routine.findAll();

    for (let routine of routines) {
        const days = await Routine.findDaysByRoutineId(routine.id);
        routine.days = days;

        for (let day of routine.days) {
            const exercises = await Exercise.findDetailsByDayId(day.id);

            day.exercises = exercises.map(ex => ({
                id: ex.id,
                exerciseId: ex.exercise_id,
                name: ex.name,
                muscleGroup: ex.muscle_group,
                videoUrl: ex.video_url,
                sets: ex.sets,
                reps: ex.reps,
                weight: ex.weight,
                completed: !!ex.completed,
                notes: ex.notes
            }));
        }
    }
    return routines;
};

const createRoutine = async (routineData) => {
    const { days } = routineData;
    const routineId = await Routine.create(routineData);

    for (let day of days) {
        const dayId = await Routine.addDay(routineId, day.dayName);

        for (let exercise of day.exercises) {
            await Exercise.addDetail(dayId, exercise);
        }
    }
    return routineId;
};

module.exports = {
    getAllRoutines,
    createRoutine
};

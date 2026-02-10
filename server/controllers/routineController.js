const routineService = require('../services/routineService');

const getRoutines = async (req, res) => {
    try {
        const routines = await routineService.getAllRoutines();
        res.json(routines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addRoutine = async (req, res) => {
    try {
        const id = await routineService.createRoutine(req.body);
        res.json({ success: true, id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getRoutines,
    addRoutine
};

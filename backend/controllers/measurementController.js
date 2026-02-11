const measurementService = require('../services/measurementService');

const getMeasurements = async (req, res) => {
    try {
        const measurements = await measurementService.getMeasurementsByUserId(req.params.userId);
        res.json(measurements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addMeasurement = async (req, res) => {
    try {
        await measurementService.addMeasurement(req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getMeasurements,
    addMeasurement
};

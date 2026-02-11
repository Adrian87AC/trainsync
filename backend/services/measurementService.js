const Measurement = require('../models/Measurement');

const getMeasurementsByUserId = async (userId) => {
    return await Measurement.findByUserId(userId);
};

const addMeasurement = async (measurementData) => {
    return await Measurement.create(measurementData);
};

module.exports = {
    getMeasurementsByUserId,
    addMeasurement
};

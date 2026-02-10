const axios = require('axios');

const fetchExternalExercises = async (language = 2) => { // 2 is English
    try {
        const response = await axios.get(`https://wger.de/api/v2/exercise/?language=${language}&status=2`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching from Wger API:', error.message);
        throw new Error('Could not fetch external exercises');
    }
};

module.exports = {
    fetchExternalExercises
};

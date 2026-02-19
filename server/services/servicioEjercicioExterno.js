const axios = require('axios');

const obtenerEjerciciosExternos = async (idioma = 2) => { // 2 = inglés en Wger API
    try {
        const respuesta = await axios.get(`https://wger.de/api/v2/exercise/?language=${idioma}&status=2`);
        return respuesta.data.results;
    } catch (error) {
        console.error('Error al obtener ejercicios de API externa:', error.message);
        throw new Error('No se pudieron obtener los ejercicios externos');
    }
};

module.exports = {
    obtenerEjerciciosExternos
};

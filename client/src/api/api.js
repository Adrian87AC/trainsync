const URL_API = 'http://localhost:5000/api';

export const obtenerUsuarios = async () => {
    const respuesta = await fetch(`${URL_API}/users`);
    if (!respuesta.ok) throw new Error('Error al obtener usuarios');
    return respuesta.json();
};

export const obtenerEjercicios = async () => {
    const respuesta = await fetch(`${URL_API}/exercises`);
    if (!respuesta.ok) throw new Error('Error al obtener ejercicios');
    return respuesta.json();
};

export const obtenerRutinas = async () => {
    const respuesta = await fetch(`${URL_API}/routines`);
    if (!respuesta.ok) throw new Error('Error al obtener rutinas');
    return respuesta.json();
};

export const crearRutina = async (datosRutina) => {
    const respuesta = await fetch(`${URL_API}/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosRutina)
    });
    if (!respuesta.ok) throw new Error('Error al crear rutina');
    return respuesta.json();
};

export const actualizarCompletado = async (id, completado) => {
    const respuesta = await fetch(`${URL_API}/exercises/completion/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: completado })
    });
    if (!respuesta.ok) throw new Error('Error al actualizar completado');
    return respuesta.json();
};

export const actualizarNotas = async (id, notas) => {
    const respuesta = await fetch(`${URL_API}/exercises/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notas })
    });
    if (!respuesta.ok) throw new Error('Error al actualizar notas');
    return respuesta.json();
};

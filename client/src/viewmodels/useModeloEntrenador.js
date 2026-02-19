import { useState, useMemo } from 'react';

export const useModeloEntrenador = (datos, usuario, callbackCrearRutina) => {
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [mostrarConstructorRutinas, setMostrarConstructorRutinas] = useState(false);

    const clientes = useMemo(() => {
        return datos.users.filter(u => u.role === 'client' && u.trainer_id === usuario.id);
    }, [datos.users, usuario.id]);

    const manejarCrearRutina = async (datosRutina) => {
        try {
            await callbackCrearRutina(datosRutina);
            setMostrarConstructorRutinas(false);
        } catch (error) {
            alert("Error al guardar la rutina");
        }
    };

    return {
        clientes,
        clienteSeleccionado,
        setClienteSeleccionado,
        mostrarConstructorRutinas,
        setMostrarConstructorRutinas,
        manejarCrearRutina
    };
};

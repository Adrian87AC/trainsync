import { useState, useEffect } from 'react';
import { obtenerUsuarios, obtenerEjercicios, obtenerRutinas, crearRutina, actualizarCompletado, actualizarNotas } from '../api/api';

export const useModeloApp = () => {
    const [vistaActual, setVistaActual] = useState('login'); // 'login', 'trainer', 'client'
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [datos, setDatos] = useState({ users: [], exercises: [], routines: [] });
    const [cargando, setCargando] = useState(true);

    const cargarDatos = async () => {
        try {
            const [usuarios, ejercicios, rutinas] = await Promise.all([
                obtenerUsuarios(),
                obtenerEjercicios(),
                obtenerRutinas()
            ]);
            setDatos({ users: usuarios, exercises: ejercicios, routines: rutinas });
        } catch (error) {
            console.error("Error al cargar datos:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const manejarLogin = (userId) => {
        const usuario = datos.users.find(u => u.id === userId);
        if (usuario) {
            setUsuarioActual(usuario);
            setVistaActual(usuario.role);
        }
    };

    const manejarLogout = () => {
        setUsuarioActual(null);
        setVistaActual('login');
    };

    const obtenerRutinasPorCliente = (clienteId) => {
        return datos.routines.filter(r => r.client_id === clienteId);
    };

    const obtenerEjercicio = (ejercicioId) => {
        return datos.exercises.find(e => e.id === ejercicioId);
    };

    const crearNuevaRutina = async (datosRutina) => {
        const datosAEnviar = {
            ...datosRutina,
            trainer_id: usuarioActual.id
        };

        try {
            await crearRutina(datosAEnviar);
            await cargarDatos();
            return true;
        } catch (error) {
            console.error("Error al crear rutina", error);
            throw error;
        }
    };

    const alternarCompletadoEjercicio = async (rutinaId, indiceDia, indiceEjercicio) => {
        const rutina = datos.routines.find(r => r.id === rutinaId);
        if (!rutina) return;

        const dia = rutina.days[indiceDia];
        const ejercicio = dia.exercises[indiceEjercicio];
        const nuevoCompletado = !ejercicio.completed;

        // Actualización optimista
        const ejerciciosActualizados = [...dia.exercises];
        ejerciciosActualizados[indiceEjercicio] = { ...ejercicio, completed: nuevoCompletado };

        const diasActualizados = [...rutina.days];
        diasActualizados[indiceDia] = { ...dia, exercises: ejerciciosActualizados };

        const rutinasActualizadas = datos.routines.map(r =>
            r.id === rutinaId ? { ...r, days: diasActualizados } : r
        );

        setDatos(prev => ({ ...prev, routines: rutinasActualizadas }));

        try {
            await actualizarCompletado(ejercicio.id, nuevoCompletado);
        } catch (error) {
            console.error("Error al actualizar completado", error);
            cargarDatos();
        }
    };

    const actualizarNotasEjercicio = async (rutinaId, indiceDia, indiceEjercicio, notas) => {
        const rutina = datos.routines.find(r => r.id === rutinaId);
        if (!rutina) return;

        const dia = rutina.days[indiceDia];
        const ejercicio = dia.exercises[indiceEjercicio];

        // Actualización optimista
        const ejerciciosActualizados = [...dia.exercises];
        ejerciciosActualizados[indiceEjercicio] = { ...ejercicio, notes: notas };

        const diasActualizados = [...rutina.days];
        diasActualizados[indiceDia] = { ...dia, exercises: ejerciciosActualizados };

        const rutinasActualizadas = datos.routines.map(r =>
            r.id === rutinaId ? { ...r, days: diasActualizados } : r
        );

        setDatos(prev => ({ ...prev, routines: rutinasActualizadas }));

        try {
            await actualizarNotas(ejercicio.id, notas);
        } catch (error) {
            console.error("Error al actualizar notas", error);
            cargarDatos();
        }
    };

    return {
        vistaActual,
        usuarioActual,
        datos,
        cargando,
        manejarLogin,
        manejarLogout,
        obtenerRutinasPorCliente,
        obtenerEjercicio,
        crearNuevaRutina,
        alternarCompletadoEjercicio,
        actualizarNotasEjercicio
    };
};

import { useState, useMemo } from 'react';

export const useModeloCliente = (rutinas) => {
    const [rutinaSeleccionada, setRutinaSeleccionada] = useState(rutinas[0] || null);
    const [editandoNotas, setEditandoNotas] = useState(null);

    const completadosHoy = useMemo(() => {
        return rutinas.reduce((suma, r) =>
            suma + r.days.reduce((s, d) =>
                s + d.exercises.filter(e => e.completed).length, 0
            ), 0
        );
    }, [rutinas]);

    return {
        rutinaSeleccionada,
        setRutinaSeleccionada,
        editandoNotas,
        setEditandoNotas,
        completadosHoy
    };
};

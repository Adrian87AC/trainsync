import { useState, useMemo } from 'react';

export const useTrainerViewModel = (data, user, createRoutineCallback) => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);

    const clients = useMemo(() => {
        return data.users.filter(u => u.role === 'client' && u.trainer_id === user.id);
    }, [data.users, user.id]);

    const handleCreateRoutine = async (routineData) => {
        try {
            await createRoutineCallback(routineData);
            setShowRoutineBuilder(false);
        } catch (error) {
            alert("Error al guardar la rutina");
        }
    };

    return {
        clients,
        selectedClient,
        setSelectedClient,
        showRoutineBuilder,
        setShowRoutineBuilder,
        handleCreateRoutine
    };
};

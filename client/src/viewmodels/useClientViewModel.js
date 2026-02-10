import { useState, useMemo } from 'react';

export const useClientViewModel = (routines) => {
    const [selectedRoutine, setSelectedRoutine] = useState(routines[0] || null);
    const [editingNotes, setEditingNotes] = useState(null);

    const completedToday = useMemo(() => {
        return routines.reduce((sum, r) =>
            sum + r.days.reduce((s, d) =>
                s + d.exercises.filter(e => e.completed).length, 0
            ), 0
        );
    }, [routines]);

    return {
        selectedRoutine,
        setSelectedRoutine,
        editingNotes,
        setEditingNotes,
        completedToday
    };
};

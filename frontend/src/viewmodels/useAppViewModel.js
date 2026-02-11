import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUsers, fetchExercises, fetchRoutines, createRoutine, updateCompletion, updateNotes } from '../api/api';
import { User, Exercise, Routine } from '../models';

export const useAppViewModel = () => {
    const { user } = useAuth();
    const [data, setData] = useState({ users: [], exercises: [], routines: [] });
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);

    const loadData = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            const [usersData, exercisesData, routinesData] = await Promise.all([
                fetchUsers(),
                fetchExercises(),
                fetchRoutines()
            ]);

            setData({
                users: usersData.map(u => new User(u)),
                exercises: exercisesData.map(e => new Exercise(e)),
                routines: routinesData.map(r => new Routine(r))
            });
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const getClientRoutines = (clientId) => {
        return data.routines.filter(r => r.client_id === clientId);
    };

    const getExercise = (exerciseId) => {
        return data.exercises.find(e => e.id === exerciseId);
    };

    const toggleExerciseCompletion = async (routineId, dayIndex, exerciseIndex) => {
        const routine = data.routines.find(r => r.id === routineId);
        if (!routine) return;

        const day = routine.days[dayIndex];
        const exercise = day.exercises[exerciseIndex];

        const newCompleted = !exercise.completed;
        try {
            await updateCompletion(exercise.id, newCompleted);
            await loadData();
        } catch (error) {
            console.error("Failed to update completion", error);
        }
    };

    const handleUpdateNotes = async (routineId, dayIndex, exerciseIndex, notes) => {
        const routine = data.routines.find(r => r.id === routineId);
        if (!routine) return;

        const day = routine.days[dayIndex];
        const exercise = day.exercises[exerciseIndex];

        try {
            await updateNotes(exercise.id, notes);
            await loadData();
        } catch (error) {
            console.error("Failed to update notes", error);
        }
    };

    const handleCreateRoutine = async (routineData) => {
        const dataToSend = {
            ...routineData,
            trainer_id: user.id
        };

        try {
            await createRoutine(dataToSend);
            setShowRoutineBuilder(false);
            await loadData();
            return true;
        } catch (error) {
            console.error("Failed to create routine", error);
            throw error;
        }
    };

    return {
        user,
        data,
        loading,
        selectedClient,
        setSelectedClient,
        showRoutineBuilder,
        setShowRoutineBuilder,
        getClientRoutines,
        getExercise,
        toggleExerciseCompletion,
        handleUpdateNotes,
        handleCreateRoutine
    };
};

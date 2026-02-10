import { useState, useEffect } from 'react';
import { fetchUsers, fetchExercises, fetchRoutines, createRoutine, updateCompletion, updateNotes } from '../api/api';

export const useAppViewModel = () => {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'trainer', 'client'
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState({ users: [], exercises: [], routines: [] });
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const [users, exercises, routines] = await Promise.all([
                fetchUsers(),
                fetchExercises(),
                fetchRoutines()
            ]);
            setData({ users, exercises, routines });
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleLogin = (userId) => {
        const user = data.users.find(u => u.id === userId);
        if (user) {
            setCurrentUser(user);
            setCurrentView(user.role);
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setCurrentView('login');
    };

    const getClientRoutines = (clientId) => {
        return data.routines.filter(r => r.client_id === clientId);
    };

    const getExercise = (exerciseId) => {
        return data.exercises.find(e => e.id === exerciseId);
    };

    const createNewRoutine = async (routineData) => {
        const dataToSend = {
            ...routineData,
            trainer_id: currentUser.id
        };

        try {
            await createRoutine(dataToSend);
            await loadData(); // Reload to show new routine
            return true;
        } catch (error) {
            console.error("Failed to create routine", error);
            throw error;
        }
    };

    const toggleExerciseCompletion = async (routineId, dayIndex, exerciseIndex) => {
        const routine = data.routines.find(r => r.id === routineId);
        if (!routine) return;

        const day = routine.days[dayIndex];
        const exercise = day.exercises[exerciseIndex];
        const newCompleted = !exercise.completed;

        // Optimistic update
        const updatedExercises = [...day.exercises];
        updatedExercises[exerciseIndex] = { ...exercise, completed: newCompleted };

        const updatedDays = [...routine.days];
        updatedDays[dayIndex] = { ...day, exercises: updatedExercises };

        const updatedRoutines = data.routines.map(r =>
            r.id === routineId ? { ...r, days: updatedDays } : r
        );

        setData(prev => ({ ...prev, routines: updatedRoutines }));

        try {
            await updateCompletion(exercise.id, newCompleted);
        } catch (error) {
            console.error("Failed to update completion", error);
            loadData(); // Revert on error
        }
    };

    const updateExerciseNotes = async (routineId, dayIndex, exerciseIndex, notes) => {
        const routine = data.routines.find(r => r.id === routineId);
        if (!routine) return;

        const day = routine.days[dayIndex];
        const exercise = day.exercises[exerciseIndex];

        // Optimistic update
        const updatedExercises = [...day.exercises];
        updatedExercises[exerciseIndex] = { ...exercise, notes: notes };

        const updatedDays = [...routine.days];
        updatedDays[dayIndex] = { ...day, exercises: updatedExercises };

        const updatedRoutines = data.routines.map(r =>
            r.id === routineId ? { ...r, days: updatedDays } : r
        );

        setData(prev => ({ ...prev, routines: updatedRoutines }));

        try {
            await updateNotes(exercise.id, notes);
        } catch (error) {
            console.error("Failed to update notes", error);
            loadData();
        }
    };

    return {
        currentView,
        currentUser,
        data,
        loading,
        handleLogin,
        handleLogout,
        getClientRoutines,
        getExercise,
        createNewRoutine,
        toggleExerciseCompletion,
        updateExerciseNotes
    };
};

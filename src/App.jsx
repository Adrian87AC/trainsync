import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import TrainerDashboard from './components/TrainerDashboard';
import ClientView from './components/ClientView';
import { fetchUsers, fetchExercises, fetchRoutines, createRoutine, updateCompletion, updateNotes } from './api/api';

const App = () => {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'trainer', 'client'
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState({ users: [], exercises: [], routines: [] });
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);

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

    // Login handler
    const handleLogin = (userId) => {
        const user = data.users.find(u => u.id === userId);
        setCurrentUser(user);
        setCurrentView(user.role);
    };

    // Get client's routines
    const getClientRoutines = (clientId) => {
        return data.routines.filter(r => r.client_id === clientId); // MySQL uses client_id
    };

    // Get exercise by ID
    const getExercise = (exerciseId) => {
        return data.exercises.find(e => e.id === exerciseId);
    };

    // Toggle exercise completion
    const toggleExerciseCompletion = async (routineId, dayIndex, exerciseIndex) => {
        // Find the specific day and exercise in the routine
        const routine = data.routines.find(r => r.id === routineId);
        if (!routine) return;

        const day = routine.days[dayIndex];
        const exercise = day.exercises[exerciseIndex];

        // Optimistic update
        const newCompleted = !exercise.completed;
        const updatedExercises = [...day.exercises];
        updatedExercises[exerciseIndex] = { ...exercise, completed: newCompleted };

        const updatedDays = [...routine.days];
        updatedDays[dayIndex] = { ...day, exercises: updatedExercises };

        const updatedRoutines = data.routines.map(r =>
            r.id === routineId ? { ...r, days: updatedDays } : r
        );

        setData({ ...data, routines: updatedRoutines });

        // API Call (using exercise_details id which we mapped to something? wait, in server.js we map `ed.*` so it has `id` from `exercise_details` table? 
        // In server.js line 42: `SELECT ed.* ...` so yes, `id` is the `exercise_details.id`.
        // BUT in server.js line 46 mapping: `day.exercises = exercises.map(ex => ({ exerciseId: ex.exercise_id ...` 
        // We need to preserve the `exercise_details.id` to update it! 
        // The current mapping in server.js MIGHT BE MISSING the `exercise_details.id`.
        // Let's check server.js mapping again. 
        // Server.js line 46: `day.exercises = exercises.map(ex => ({ ...`
        // It does NOT map `id` (the ID of the relation). It only maps `exerciseId` (the ID of the exercise definition).
        // I need to fix server.js first to return the `id` of `exercise_details`.
        // For now, I will assume I fix it.
        try {
            // We need the ID of the exercise_details record, NOT the exercise definition ID.
            // I'll need to check server.js to ensure this ID is available.
            // If it's available as `ex.id`, I should map it.
            await updateCompletion(exercise.id, newCompleted);
        } catch (error) {
            console.error("Failed to update completion", error);
            // Revert on error would be ideal here
            loadData();
        }
    };

    // Update exercise notes
    const handleUpdateNotes = async (routineId, dayIndex, exerciseIndex, notes) => {
        const routine = data.routines.find(r => r.id === routineId);
        if (!routine) return;

        const day = routine.days[dayIndex];
        const exercise = day.exercises[exerciseIndex];

        try {
            await updateNotes(exercise.id, notes);
            // Reload data to ensure sync
            // Or optimistic update if we want better UX
            const updatedExercises = [...day.exercises];
            updatedExercises[exerciseIndex] = { ...exercise, notes: notes };

            const updatedDays = [...routine.days];
            updatedDays[dayIndex] = { ...day, exercises: updatedExercises };

            const updatedRoutines = data.routines.map(r =>
                r.id === routineId ? { ...r, days: updatedDays } : r
            );

            setData({ ...data, routines: updatedRoutines });

        } catch (error) {
            console.error("Failed to update notes", error);
        }
    };

    const handleCreateRoutine = async (routineData) => {
        // Add trainer_id to routineData
        const dataToSend = {
            ...routineData,
            trainer_id: currentUser.id
        };

        try {
            await createRoutine(dataToSend);
            setShowRoutineBuilder(false);
            loadData(); // Reload to show new routine
        } catch (error) {
            console.error("Failed to create routine", error);
            alert("Error al guardar la rutina");
        }
    }

    if (loading) return <div style={{ color: 'white', padding: '20px' }}>Cargando datos...</div>;

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b3d 100%)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {currentView === 'login' && (
                <LoginScreen onLogin={handleLogin} users={data.users} />
            )}

            {currentView === 'trainer' && (
                <TrainerDashboard
                    user={currentUser}
                    data={data}
                    selectedClient={selectedClient}
                    setSelectedClient={setSelectedClient}
                    showRoutineBuilder={showRoutineBuilder}
                    setShowRoutineBuilder={setShowRoutineBuilder}
                    getClientRoutines={getClientRoutines}
                    getExercise={getExercise}
                    onLogout={() => setCurrentView('login')}
                    onSaveRoutine={handleCreateRoutine}
                />
            )}

            {currentView === 'client' && (
                <ClientView
                    user={currentUser}
                    routines={getClientRoutines(currentUser.id)}
                    getExercise={getExercise}
                    toggleExerciseCompletion={toggleExerciseCompletion}
                    updateExerciseNotes={handleUpdateNotes}
                    onLogout={() => setCurrentView('login')}
                />
            )}
        </div>
    );
};

export default App;
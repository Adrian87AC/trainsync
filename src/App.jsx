import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import TrainerDashboard from './components/TrainerDashboard';
import ClientView from './components/ClientView';
import ChangePassword from './components/ChangePassword';
import { fetchUsers, fetchExercises, fetchRoutines, createRoutine, updateCompletion, updateNotes } from './api/api';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const App = () => {
    const { user } = useAuth();
    const [data, setData] = useState({ users: [], exercises: [], routines: [] });
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);

    const loadData = async () => {
        if (!user) return;
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
    }, [user]);

    // Get client's routines
    const getClientRoutines = (clientId) => {
        return data.routines.filter(r => r.client_id === clientId);
    };

    // Get exercise by ID
    const getExercise = (exerciseId) => {
        return data.exercises.find(e => e.id === exerciseId);
    };

    // Toggle exercise completion
    const toggleExerciseCompletion = async (routineId, dayIndex, exerciseIndex) => {
        const routine = data.routines.find(r => r.id === routineId);
        if (!routine) return;

        const day = routine.days[dayIndex];
        const exercise = day.exercises[exerciseIndex];

        const newCompleted = !exercise.completed;
        try {
            await updateCompletion(exercise.id, newCompleted);
            loadData();
        } catch (error) {
            console.error("Failed to update completion", error);
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
            loadData();
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
            loadData();
        } catch (error) {
            console.error("Failed to create routine", error);
            alert("Error al guardar la rutina");
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b3d 100%)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/change-password" element={
                    <ProtectedRoute>
                        <ChangePassword />
                    </ProtectedRoute>
                } />

                <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />

                <Route path="/" element={
                    <ProtectedRoute>
                        {user?.role === 'admin' ? <Navigate to="/admin" /> : (
                            user?.role === 'trainer' ? (
                                <TrainerDashboard
                                    user={user}
                                    data={data}
                                    selectedClient={selectedClient}
                                    setSelectedClient={setSelectedClient}
                                    showRoutineBuilder={showRoutineBuilder}
                                    setShowRoutineBuilder={setShowRoutineBuilder}
                                    getClientRoutines={getClientRoutines}
                                    getExercise={getExercise}
                                    onSaveRoutine={handleCreateRoutine}
                                />
                            ) : (
                                user ? (
                                    <ClientView
                                        user={user}
                                        routines={getClientRoutines(user.id)}
                                        getExercise={getExercise}
                                        toggleExerciseCompletion={toggleExerciseCompletion}
                                        updateExerciseNotes={handleUpdateNotes}
                                    />
                                ) : null
                            )
                        )}
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    );
};

export default App;
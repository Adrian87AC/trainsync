import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import TrainerDashboard from './components/TrainerDashboard';
import ClientView from './components/ClientView';
import ChangePassword from './components/ChangePassword';
import { useAppViewModel } from './viewmodels/useAppViewModel';

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
    const {
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
    } = useAppViewModel();

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
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import TrainerDashboard from './components/TrainerDashboard';
import ClientView from './components/ClientView';
import { initialData } from './data/mockData';

const App = () => {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'trainer', 'client'
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState(initialData);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);

    // Login handler
    const handleLogin = (userId) => {
        const user = data.users.find(u => u.id === userId);
        setCurrentUser(user);
        setCurrentView(user.role);
    };

    // Get client's routines
    const getClientRoutines = (clientId) => {
        return data.routines.filter(r => r.clientId === clientId);
    };

    // Get exercise by ID
    const getExercise = (exerciseId) => {
        return data.exercises.find(e => e.id === exerciseId);
    };

    // Toggle exercise completion
    const toggleExerciseCompletion = (routineId, dayIndex, exerciseIndex) => {
        setData(prev => ({
            ...prev,
            routines: prev.routines.map(routine => {
                if (routine.id === routineId) {
                    const newDays = [...routine.days];
                    newDays[dayIndex].exercises[exerciseIndex].completed =
                        !newDays[dayIndex].exercises[exerciseIndex].completed;
                    return { ...routine, days: newDays };
                }
                return routine;
            })
        }));
    };

    // Update exercise notes
    const updateExerciseNotes = (routineId, dayIndex, exerciseIndex, notes) => {
        setData(prev => ({
            ...prev,
            routines: prev.routines.map(routine => {
                if (routine.id === routineId) {
                    const newDays = [...routine.days];
                    newDays[dayIndex].exercises[exerciseIndex].notes = notes;
                    return { ...routine, days: newDays };
                }
                return routine;
            })
        }));
    };

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
                />
            )}

            {currentView === 'client' && (
                <ClientView
                    user={currentUser}
                    routines={getClientRoutines(currentUser.id)}
                    getExercise={getExercise}
                    toggleExerciseCompletion={toggleExerciseCompletion}
                    updateExerciseNotes={updateExerciseNotes}
                    onLogout={() => setCurrentView('login')}
                />
            )}
        </div>
    );
};

export default App;
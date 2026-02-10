import React from 'react';
import LoginScreen from './components/LoginScreen';
import TrainerDashboard from './components/TrainerDashboard';
import ClientView from './components/ClientView';
import { useAppViewModel } from './viewmodels/useAppViewModel';

const App = () => {
    // ViewModel - All business logic and state management
    const viewModel = useAppViewModel();

    // Loading state
    if (viewModel.loading) {
        return (
            <div style={{ color: 'white', padding: '20px' }}>
                Cargando datos...
            </div>
        );
    }

    // View - Pure presentation logic
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b3d 100%)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {viewModel.currentView === 'login' && (
                <LoginScreen
                    onLogin={viewModel.handleLogin}
                    users={viewModel.data.users}
                />
            )}

            {viewModel.currentView === 'trainer' && (
                <TrainerDashboard
                    user={viewModel.currentUser}
                    data={viewModel.data}
                    getClientRoutines={viewModel.getClientRoutines}
                    getExercise={viewModel.getExercise}
                    onLogout={viewModel.handleLogout}
                    onSaveRoutine={viewModel.createNewRoutine}
                />
            )}

            {viewModel.currentView === 'client' && (
                <ClientView
                    user={viewModel.currentUser}
                    routines={viewModel.getClientRoutines(viewModel.currentUser.id)}
                    getExercise={viewModel.getExercise}
                    toggleExerciseCompletion={viewModel.toggleExerciseCompletion}
                    updateExerciseNotes={viewModel.updateExerciseNotes}
                    onLogout={viewModel.handleLogout}
                />
            )}
        </div>
    );
};

export default App;
import React from 'react';
import { Dumbbell, User, Activity, TrendingUp } from 'lucide-react';
import StatCard from './Estadisticas';
import ClientList from './ClientList';
import ClientRoutines from './ClientRoutines';
import RoutineBuilder from './RoutineBuilder';
import { useTrainerViewModel } from '../../viewmodels/useTrainerViewModel';
import './Inicio.css';

const Inicio = ({
    user,
    data,
    getClientRoutines,
    getExercise,
    onLogout,
    onSaveRoutine
}) => {
    // ViewModel - Manages trainer-specific state and logic
    const viewModel = useTrainerViewModel(data, user, onSaveRoutine);

    return (
        <div className="inicio-container">
            {/* Header */}
            <div className="inicio-header">
                <div className="inicio-logo-container">
                    <Dumbbell size={28} className="inicio-logo-icon" />
                    <h2 className="inicio-title">TrainSync Coach</h2>
                </div>
                <div className="inicio-user-actions">
                    <div className="inicio-user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-role">Entrenador Pro</div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="logout-button"
                    >
                        Salir
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="inicio-content">
                {/* Stats Cards */}
                <div className="stats-grid">
                    <StatCard
                        icon={<User size={24} />}
                        label="Clientes Activos"
                        value={viewModel.clients.length}
                        color="#00d4ff"
                    />
                    <StatCard
                        icon={<Activity size={24} />}
                        label="Rutinas Creadas"
                        value={data.routines.length}
                        color="#7b2ff7"
                    />
                    <StatCard
                        icon={<TrendingUp size={24} />}
                        label="Ejercicios Completados"
                        value="87%"
                        color="#00ff88"
                    />
                </div>

                {/* Clients List */}
                <ListaClientes
                    clients={viewModel.clients}
                    selectedClient={viewModel.selectedClient}
                    setSelectedClient={viewModel.setSelectedClient}
                    getClientRoutines={getClientRoutines}
                />

                {/* Selected Client Routines */}
                {viewModel.selectedClient && (
                    <ClientRoutines
                        client={viewModel.selectedClient}
                        routines={getClientRoutines(viewModel.selectedClient.id)}
                        getExercise={getExercise}
                        setShowRoutineBuilder={viewModel.setShowRoutineBuilder}
                    />
                )}

                {/* Routine Builder Modal */}
                {viewModel.showRoutineBuilder && (
                    <div className="routine-builder-modal-overlay">
                        <RoutineBuilder
                            clients={data.users.filter(u => u.role === 'client')}
                            exercises={data.exercises}
                            onSave={viewModel.handleCreateRoutine}
                            onCancel={() => viewModel.setShowRoutineBuilder(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inicio;

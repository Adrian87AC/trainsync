import React from 'react';
import { Dumbbell, Plus, User, Activity, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';
import ClientList from './ClientList';
import ClientRoutines from './ClientRoutines';
import RoutineBuilder from './RoutineBuilder';

const TrainerDashboard = ({
    user,
    data,
    selectedClient,
    setSelectedClient,
    showRoutineBuilder,
    setShowRoutineBuilder,
    getClientRoutines,
    getExercise,
    onSaveRoutine
}) => {
    const clients = data.users.filter(u => u.role === 'client' && u.trainer_id === user.id);

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Main Content */}
            <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '20px',
                    marginBottom: '32px'
                }}>
                    <StatCard
                        icon={<User size={24} />}
                        label="Clientes Activos"
                        value={clients.length}
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
                <ClientList
                    clients={clients}
                    selectedClient={selectedClient}
                    setSelectedClient={setSelectedClient}
                    getClientRoutines={getClientRoutines}
                />

                {/* Selected Client Routines */}
                {selectedClient && (
                    <ClientRoutines
                        client={selectedClient}
                        routines={getClientRoutines(selectedClient.id)}
                        getExercise={getExercise}
                        setShowRoutineBuilder={setShowRoutineBuilder}
                    />
                )}

                {/* Routine Builder Modal */}
                {showRoutineBuilder && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
                        <RoutineBuilder
                            clients={data.users.filter(u => u.role === 'client')}
                            exercises={data.exercises}
                            onSave={onSaveRoutine}
                            onCancel={() => setShowRoutineBuilder(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainerDashboard;
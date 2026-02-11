import React from 'react';

const ClientList = ({ clients, selectedClient, setSelectedClient, getClientRoutines }) => {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px'
        }}>
            <h3 style={{
                color: 'white',
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '20px'
            }}>Mis Clientes</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {clients.map(client => {
                    const clientRoutines = getClientRoutines(client.id);
                    const totalExercises = clientRoutines.reduce((sum, r) =>
                        sum + r.days.reduce((daySum, d) => daySum + d.exercises.length, 0), 0
                    );
                    const completedExercises = clientRoutines.reduce((sum, r) =>
                        sum + r.days.reduce((daySum, d) =>
                            daySum + d.exercises.filter(e => e.completed).length, 0
                        ), 0
                    );
                    const progress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

                    return (
                        <div
                            key={client.id}
                            onClick={() => setSelectedClient(client)}
                            style={{
                                background: selectedClient?.id === client.id
                                    ? 'rgba(123, 47, 247, 0.2)'
                                    : 'rgba(255, 255, 255, 0.03)',
                                border: `1px solid ${selectedClient?.id === client.id
                                    ? 'rgba(123, 47, 247, 0.5)'
                                    : 'rgba(255, 255, 255, 0.1)'}`,
                                borderRadius: '12px',
                                padding: '16px 20px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedClient?.id !== client.id) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedClient?.id !== client.id) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                }
                            }}
                        >
                            <div>
                                <div style={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '4px'
                                }}>
                                    {client.name}
                                </div>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontSize: '13px'
                                }}>
                                    {clientRoutines.length} rutina{clientRoutines.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        color: '#00ff88',
                                        fontSize: '20px',
                                        fontWeight: '700'
                                    }}>
                                        {progress}%
                                    </div>
                                    <div style={{
                                        color: 'rgba(255, 255, 255, 0.4)',
                                        fontSize: '11px'
                                    }}>
                                        progreso
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ClientList;
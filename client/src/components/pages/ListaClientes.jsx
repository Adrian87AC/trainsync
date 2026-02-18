import React from 'react';
import './ListaClientes.css';

const ListaClientes = ({ clients, selectedClient, setSelectedClient, getClientRoutines }) => {
    return (
        <div className="lista-clientes-container">
            <h3 className="lista-clientes-title">Mis Clientes</h3>

            <div className="clientes-flex-list">
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

                    const isActive = selectedClient?.id === client.id;

                    return (
                        <div
                            key={client.id}
                            onClick={() => setSelectedClient(client)}
                            className={`cliente-item-card ${isActive ? 'cliente-item-active' : 'cliente-item-inactive'}`}
                        >
                            <div>
                                <div className="cliente-name-text">
                                    {client.name}
                                </div>
                                <div className="cliente-routines-count">
                                    {clientRoutines.length} rutina{clientRoutines.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                            <div className="cliente-progress-container">
                                <div className="cliente-progress-info">
                                    <div className="cliente-progress-value">
                                        {progress}%
                                    </div>
                                    <div className="cliente-progress-label">
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

export default ListaClientes;

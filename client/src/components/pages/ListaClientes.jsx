import React from 'react';
import './ListaClientes.css';

const ListaClientes = ({ clientes, clienteSeleccionado, setClienteSeleccionado, obtenerRutinasPorCliente }) => {
    return (
        <div className="lista-clientes-container">
            <h3 className="lista-clientes-title">Mis Clientes</h3>

            <div className="clientes-flex-list">
                {clientes.map(cliente => {
                    const rutinasCliente = obtenerRutinasPorCliente(cliente.id);
                    const totalEjercicios = rutinasCliente.reduce((sum, r) =>
                        sum + r.days.reduce((daySum, d) => daySum + d.exercises.length, 0), 0
                    );
                    const ejerciciosCompletados = rutinasCliente.reduce((sum, r) =>
                        sum + r.days.reduce((daySum, d) =>
                            daySum + d.exercises.filter(e => e.completed).length, 0
                        ), 0
                    );
                    const progreso = totalEjercicios > 0 ? Math.round((ejerciciosCompletados / totalEjercicios) * 100) : 0;

                    const estaActivo = clienteSeleccionado?.id === cliente.id;

                    return (
                        <div
                            key={cliente.id}
                            onClick={() => setClienteSeleccionado(cliente)}
                            className={`cliente-item-card ${estaActivo ? 'cliente-item-active' : 'cliente-item-inactive'}`}
                        >
                            <div>
                                <div className="cliente-name-text">
                                    {cliente.name}
                                </div>
                                <div className="cliente-routines-count">
                                    {rutinasCliente.length} rutina{rutinasCliente.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                            <div className="cliente-progress-container">
                                <div className="cliente-progress-info">
                                    <div className="cliente-progress-value">
                                        {progreso}%
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

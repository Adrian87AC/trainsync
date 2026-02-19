import React from 'react';
import { Plus, Calendar, Check } from 'lucide-react';
import './ClientesRutinas.css';

const ClientesRutinas = ({ cliente, rutinas, obtenerEjercicio, setMostrarConstructorRutinas }) => {
    return (
        <div className="clientes-rutinas-container">
            <div className="clientes-rutinas-header">
                <h3 className="clientes-rutinas-title">
                    Rutinas de {cliente.name}
                </h3>
                <button
                    onClick={() => setMostrarConstructorRutinas(true)}
                    className="new-routine-button"
                >
                    <Plus size={18} />
                    Nueva Rutina
                </button>
            </div>

            <div className="routines-list">
                {rutinas.map(rutina => (
                    <div
                        key={rutina.id}
                        className="routine-card"
                    >
                        <h4 className="routine-name">
                            {rutina.name}
                        </h4>
                        {rutina.days.map((dia, indiceDia) => (
                            <div key={indiceDia} className="routine-day">
                                <div className="routine-day-header">
                                    <Calendar size={16} />
                                    {dia.day_name}
                                </div>
                                <div className="routine-day-exercises">
                                    {dia.exercises.map((ej, indiceEjercicio) => {
                                        const ejercicio = obtenerEjercicio(ej.exerciseId);
                                        return (
                                            <div
                                                key={indiceEjercicio}
                                                className={`exercise-item ${ej.completed ? 'exercise-item-completed' : 'exercise-item-incomplete'}`}
                                            >
                                                <div>
                                                    <div className="exercise-name">
                                                        {ejercicio?.name}
                                                    </div>
                                                    <div className="exercise-details-text">
                                                        {ej.sets} series × {ej.reps} reps @ {ej.weight}kg
                                                    </div>
                                                    {ej.notes && (
                                                        <div className="exercise-notes">
                                                            💬 {ej.notes}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={`status-icon-container ${ej.completed ? 'status-icon-completed' : 'status-icon-incomplete'}`}>
                                                    {ej.completed && <Check size={16} className="status-check-icon" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientesRutinas;

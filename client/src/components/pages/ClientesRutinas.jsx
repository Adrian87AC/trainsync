import React from 'react';
import { Plus, Calendar, Check } from 'lucide-react';
import './ClientesRutinas.css';

const ClientesRutinas = ({ client, routines, getExercise, setShowRoutineBuilder }) => {
    return (
        <div className="clientes-rutinas-container">
            <div className="clientes-rutinas-header">
                <h3 className="clientes-rutinas-title">
                    Rutinas de {client.name}
                </h3>
                <button
                    onClick={() => setShowRoutineBuilder(true)}
                    className="new-routine-button"
                >
                    <Plus size={18} />
                    Nueva Rutina
                </button>
            </div>

            <div className="routines-list">
                {routines.map(routine => (
                    <div
                        key={routine.id}
                        className="routine-card"
                    >
                        <h4 className="routine-name">
                            {routine.name}
                        </h4>
                        {routine.days.map((day, dayIdx) => (
                            <div key={dayIdx} className="routine-day">
                                <div className="routine-day-header">
                                    <Calendar size={16} />
                                    {day.day_name}
                                </div>
                                <div className="routine-day-exercises">
                                    {day.exercises.map((ex, exIdx) => {
                                        const exercise = getExercise(ex.exerciseId);
                                        return (
                                            <div
                                                key={exIdx}
                                                className={`exercise-item ${ex.completed ? 'exercise-item-completed' : 'exercise-item-incomplete'}`}
                                            >
                                                <div>
                                                    <div className="exercise-name">
                                                        {exercise?.name}
                                                    </div>
                                                    <div className="exercise-details-text">
                                                        {ex.sets} series × {ex.reps} reps @ {ex.weight}kg
                                                    </div>
                                                    {ex.notes && (
                                                        <div className="exercise-notes">
                                                            💬 {ex.notes}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={`status-icon-container ${ex.completed ? 'status-icon-completed' : 'status-icon-incomplete'}`}>
                                                    {ex.completed && <Check size={16} className="status-check-icon" />}
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

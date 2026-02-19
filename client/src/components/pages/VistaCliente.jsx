import React from 'react';
import { Clock } from 'lucide-react';
import CartaEjercicio from './CartaEjercicio';
import { useClientViewModel } from '../../viewmodels/useClientViewModel';
import { HeaderCliente } from '../header/Header';
import Footer from '../footer/Footer';
import './VistaCliente.css';

const VistaCliente = ({
    user,
    routines,
    getExercise,
    toggleExerciseCompletion,
    updateExerciseNotes,
    onLogout
}) => {
    // ViewModel - Manages component state and computed values
    const viewModel = useClientViewModel(routines);

    return (
        <div className="vista-cliente-container">
            {/* Header */}
            <HeaderCliente
                user={user}
                completedToday={viewModel.completedToday}
                onLogout={onLogout}
            />

            {/* Content */}
            <div className="vista-cliente-content">
                <h3 className="content-title">
                    Tu Entrenamiento de Hoy
                </h3>

                {viewModel.selectedRoutine && viewModel.selectedRoutine.days.map((day, dayIdx) => (
                    <div key={dayIdx} className="day-section">
                        <div className="day-header">
                            <Clock size={16} className="clock-icon" />
                            <span className="day-name">
                                {day.day_name}
                            </span>
                        </div>

                        <div className="exercises-list">
                            {day.exercises.map((ex, exIdx) => (
                                <CartaEjercicio
                                    key={exIdx}
                                    ejercicio={getExercise(ex.exerciseId)}
                                    datosEjercicio={ex}
                                    estaEditando={viewModel.editingNotes === `${dayIdx}-${exIdx}`}
                                    onToggleComplete={() => toggleExerciseCompletion(viewModel.selectedRoutine.id, dayIdx, exIdx)}
                                    enEditarNotas={() => viewModel.setEditingNotes(`${dayIdx}-${exIdx}`)}
                                    enGuardarNotas={() => viewModel.setEditingNotes(null)}
                                    enActualizarNotas={(notes) => updateExerciseNotes(viewModel.selectedRoutine.id, dayIdx, exIdx, notes)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default VistaCliente;

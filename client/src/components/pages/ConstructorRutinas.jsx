import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, Dumbbell, Save } from 'lucide-react';
import './ConstructorRutinas.css';

const ConstructorRutinas = ({ clients, exercises, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [days, setDays] = useState([{ dayName: '', exercises: [] }]);

    const addDay = () => {
        setDays([...days, { dayName: '', exercises: [] }]);
    };

    const removeDay = (index) => {
        setDays(days.filter((_, i) => i !== index));
    };

    const updateDayName = (index, value) => {
        const newDays = [...days];
        newDays[index].dayName = value;
        setDays(newDays);
    };

    const addExerciseToDay = (dayIndex) => {
        const newDays = [...days];
        newDays[dayIndex].exercises.push({
            exerciseId: exercises[0]?.id || '',
            sets: 3,
            reps: '10',
            weight: 0
        });
        setDays(newDays);
    };

    const removeExerciseFromDay = (dayIndex, exerciseIndex) => {
        const newDays = [...days];
        newDays[dayIndex].exercises.splice(exerciseIndex, 1);
        setDays(newDays);
    };

    const updateExercise = (dayIndex, exerciseIndex, field, value) => {
        const newDays = [...days];
        newDays[dayIndex].exercises[exerciseIndex][field] = value;
        setDays(newDays);
    };

    const handleSave = () => {
        if (!name || !clientId || days.length === 0) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        const routineData = {
            name,
            client_id: parseInt(clientId),
            days
        };
        onSave(routineData);
    };

    return (
        <div className="constructor-rutinas-overlay">
            <div className="constructor-rutinas-modal">
                {/* Header */}
                <div className="constructor-header">
                    <h2 className="constructor-title">Nueva Rutina</h2>
                    <button onClick={onCancel} className="close-button">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="constructor-body">
                    {/* Basic Info */}
                    <div className="basic-info-grid">
                        <div>
                            <label className="input-label">Nombre de la Rutina</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ej: Hipertrofia PPL"
                                className="text-input"
                            />
                        </div>
                        <div>
                            <label className="input-label">Cliente</label>
                            <select
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                className="select-input"
                            >
                                <option value="">Seleccionar Cliente</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Days */}
                    <div className="days-list">
                        {days.map((day, dayIndex) => (
                            <div key={dayIndex} className="day-card">
                                <div className="day-header">
                                    <div className="day-title-container">
                                        <Calendar size={20} className="day-icon" />
                                        <input
                                            type="text"
                                            value={day.dayName}
                                            onChange={(e) => updateDayName(dayIndex, e.target.value)}
                                            placeholder="Nombre del día (Ej: Lunes - Pecho)"
                                            className="day-name-input"
                                        />
                                    </div>
                                    <button onClick={() => removeDay(dayIndex)} className="remove-day-button">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Exercises */}
                                <div className="exercises-list">
                                    {day.exercises.map((ex, exIndex) => (
                                        <div key={exIndex} className="exercise-row">
                                            <select
                                                value={ex.exerciseId}
                                                onChange={(e) => updateExercise(dayIndex, exIndex, 'exerciseId', e.target.value)}
                                                className="exercise-select"
                                            >
                                                {exercises.map(e => (
                                                    <option key={e.id} value={e.id}>{e.name}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                value={ex.sets}
                                                onChange={(e) => updateExercise(dayIndex, exIndex, 'sets', e.target.value)}
                                                placeholder="Series"
                                                className="exercise-input"
                                            />
                                            <input
                                                type="text"
                                                value={ex.reps}
                                                onChange={(e) => updateExercise(dayIndex, exIndex, 'reps', e.target.value)}
                                                placeholder="Reps"
                                                className="exercise-input"
                                            />
                                            <input
                                                type="number"
                                                value={ex.weight}
                                                onChange={(e) => updateExercise(dayIndex, exIndex, 'weight', e.target.value)}
                                                placeholder="Kg"
                                                className="exercise-input"
                                            />
                                            <button onClick={() => removeExerciseFromDay(dayIndex, exIndex)} className="remove-exercise-button">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addExerciseToDay(dayIndex)}
                                        className="add-exercise-button"
                                    >
                                        <Plus size={16} /> Añadir Ejercicio
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addDay}
                        className="add-day-button"
                    >
                        <Plus size={20} /> Añadir Día de Entrenamiento
                    </button>
                </div>

                {/* Footer */}
                <div className="constructor-footer">
                    <button
                        onClick={onCancel}
                        className="cancel-button"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="save-button"
                    >
                        <Save size={18} /> Guardar Rutina
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConstructorRutinas;

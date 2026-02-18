import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, Dumbbell, Save } from 'lucide-react';

const RoutineBuilder = ({ clients, exercises, onSave, onCancel }) => {
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
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                background: '#1a1f3a',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#0a0e27'
                }}>
                    <h2 style={{ color: 'white', margin: 0 }}>Nueva Rutina</h2>
                    <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255, 255, 255, 0.5)' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                    {/* Basic Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                        <div>
                            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px', fontSize: '14px' }}>Nombre de la Rutina</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ej: Hipertrofia PPL"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px', fontSize: '14px' }}>Cliente</label>
                            <select
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white'
                                }}
                            >
                                <option value="">Seleccionar Cliente</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Days */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {days.map((day, dayIndex) => (
                            <div key={dayIndex} style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '16px',
                                padding: '20px',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                        <Calendar size={20} style={{ color: '#00d4ff' }} />
                                        <input
                                            type="text"
                                            value={day.dayName}
                                            onChange={(e) => updateDayName(dayIndex, e.target.value)}
                                            placeholder="Nombre del día (Ej: Lunes - Pecho)"
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                width: '100%',
                                                borderBottom: '1px dashed rgba(255, 255, 255, 0.2)'
                                            }}
                                        />
                                    </div>
                                    <button onClick={() => removeDay(dayIndex)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Exercises */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {day.exercises.map((ex, exIndex) => (
                                        <div key={exIndex} style={{
                                            display: 'grid',
                                            gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                                            gap: '12px',
                                            alignItems: 'center',
                                            padding: '12px',
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            borderRadius: '8px'
                                        }}>
                                            <select
                                                value={ex.exerciseId}
                                                onChange={(e) => updateExercise(dayIndex, exIndex, 'exerciseId', e.target.value)}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    color: 'white',
                                                    padding: '8px',
                                                    borderRadius: '4px'
                                                }}
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
                                                style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '8px', borderRadius: '4px' }}
                                            />
                                            <input
                                                type="text"
                                                value={ex.reps}
                                                onChange={(e) => updateExercise(dayIndex, exIndex, 'reps', e.target.value)}
                                                placeholder="Reps"
                                                style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '8px', borderRadius: '4px' }}
                                            />
                                            <input
                                                type="number"
                                                value={ex.weight}
                                                onChange={(e) => updateExercise(dayIndex, exIndex, 'weight', e.target.value)}
                                                placeholder="Kg"
                                                style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '8px', borderRadius: '4px' }}
                                            />
                                            <button onClick={() => removeExerciseFromDay(dayIndex, exIndex)} style={{ color: 'rgba(255, 255, 255, 0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addExerciseToDay(dayIndex)}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px dashed rgba(255, 255, 255, 0.2)',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            color: '#00d4ff',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            fontSize: '13px'
                                        }}
                                    >
                                        <Plus size={16} /> Añadir Ejercicio
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addDay}
                        style={{
                            width: '100%',
                            marginTop: '20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '12px',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Plus size={20} /> Añadir Día de Entrenamiento
                    </button>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '24px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px',
                    background: '#0a0e27'
                }}>
                    <button
                        onClick={onCancel}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        style={{
                            background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                            border: 'none',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <Save size={18} /> Guardar Rutina
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoutineBuilder;

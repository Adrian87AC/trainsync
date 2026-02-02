import React from 'react';
import { Plus, Calendar, Check } from 'lucide-react';

const ClientRoutines = ({ client, routines, getExercise, setShowRoutineBuilder }) => {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            marginTop: '20px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h3 style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                }}>
                    Rutinas de {client.name}
                </h3>
                <button
                    onClick={() => setShowRoutineBuilder(true)}
                    style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    <Plus size={18} />
                    Nueva Rutina
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {routines.map(routine => (
                    <div
                        key={routine.id}
                        style={{
                            background: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <h4 style={{
                            color: '#00d4ff',
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '16px'
                        }}>
                            {routine.name}
                        </h4>
                        {routine.days.map((day, dayIdx) => (
                            <div key={dayIdx} style={{ marginBottom: '16px' }}>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    marginBottom: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <Calendar size={16} />
                                    {day.dayName}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {day.exercises.map((ex, exIdx) => {
                                        const exercise = getExercise(ex.exerciseId);
                                        return (
                                            <div
                                                key={exIdx}
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    borderRadius: '8px',
                                                    padding: '12px 16px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    borderLeft: `3px solid ${ex.completed ? '#00ff88' : 'rgba(255, 255, 255, 0.2)'}`
                                                }}
                                            >
                                                <div>
                                                    <div style={{
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: '500'
                                                    }}>
                                                        {exercise?.name}
                                                    </div>
                                                    <div style={{
                                                        color: 'rgba(255, 255, 255, 0.5)',
                                                        fontSize: '12px',
                                                        marginTop: '4px'
                                                    }}>
                                                        {ex.sets} series × {ex.reps} reps @ {ex.weight}kg
                                                    </div>
                                                    {ex.notes && (
                                                        <div style={{
                                                            color: '#00d4ff',
                                                            fontSize: '12px',
                                                            marginTop: '6px',
                                                            fontStyle: 'italic'
                                                        }}>
                                                            💬 {ex.notes}
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '6px',
                                                    background: ex.completed ? '#00ff88' : 'rgba(255, 255, 255, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    {ex.completed && <Check size={16} style={{ color: '#0a0e27' }} />}
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

export default ClientRoutines;
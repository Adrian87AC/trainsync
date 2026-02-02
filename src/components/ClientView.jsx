import React, { useState } from 'react';
import { Menu, Activity, Clock, Check } from 'lucide-react';
import ExerciseCard from './ExerciseCard';

const ClientView = ({
    user,
    routines,
    getExercise,
    toggleExerciseCompletion,
    updateExerciseNotes,
    onLogout
}) => {
    const [selectedRoutine] = useState(routines[0] || null);
    const [editingNotes, setEditingNotes] = useState(null);

    const completedToday = routines.reduce((sum, r) =>
        sum + r.days.reduce((s, d) =>
            s + d.exercises.filter(e => e.completed).length, 0
        ), 0
    );

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Mobile Header */}
            <div style={{
                background: 'linear-gradient(135deg, #7b2ff7 0%, #b24bf3 100%)',
                padding: '24px 20px 32px',
                borderRadius: '0 0 24px 24px',
                boxShadow: '0 4px 20px rgba(123, 47, 247, 0.3)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
                            Hola,
                        </div>
                        <div style={{
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: '700'
                        }}>
                            {user.name.split(' ')[0]} 💪
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '12px',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <Menu size={20} style={{ color: 'white' }} />
                    </button>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Activity size={28} style={{ color: 'white' }} />
                    </div>
                    <div>
                        <div style={{ color: 'white', fontSize: '28px', fontWeight: '800' }}>
                            {completedToday}
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px' }}>
                            Ejercicios completados hoy
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px 20px' }}>
                <h3 style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '16px'
                }}>
                    Tu Entrenamiento de Hoy
                </h3>

                {selectedRoutine && selectedRoutine.days.map((day, dayIdx) => (
                    <div key={dayIdx} style={{ marginBottom: '24px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '12px'
                        }}>
                            <Clock size={16} style={{ color: '#00d4ff' }} />
                            <span style={{
                                color: '#00d4ff',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>
                                {day.dayName}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {day.exercises.map((ex, exIdx) => (
                                <ExerciseCard
                                    key={exIdx}
                                    exercise={getExercise(ex.exerciseId)}
                                    exerciseData={ex}
                                    isEditing={editingNotes === `${dayIdx}-${exIdx}`}
                                    onToggleComplete={() => toggleExerciseCompletion(selectedRoutine.id, dayIdx, exIdx)}
                                    onEditNotes={() => setEditingNotes(`${dayIdx}-${exIdx}`)}
                                    onSaveNotes={() => setEditingNotes(null)}
                                    onUpdateNotes={(notes) => updateExerciseNotes(selectedRoutine.id, dayIdx, exIdx, notes)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientView;
import React from 'react';
import { Check } from 'lucide-react';

const CartaEjercicio = ({
    ejercicio,
    datosEjercicio,
    estaEditando,
    onToggleComplete,
    enEditarNotas,
    enGuardarNotas,
    enActualizarNotas
}) => {
    return (
        <div
            style={{
                background: datosEjercicio.completed
                    ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${datosEjercicio.completed ? '#00ff88' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '16px',
                padding: '16px',
                transition: 'all 0.3s'
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
            }}>
                <div style={{ flex: 1 }}>
                    <div style={{
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '6px'
                    }}>
                        {ejercicio?.name}
                    </div>
                    <div style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '13px',
                        marginBottom: '4px'
                    }}>
                        {datosEjercicio.sets} series × {datosEjercicio.reps} reps
                    </div>
                    <div style={{
                        color: '#00d4ff',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        💪 {datosEjercicio.weight} kg
                    </div>
                </div>

                <button
                    onClick={onToggleComplete}
                    style={{
                        background: datosEjercicio.completed
                            ? 'linear-gradient(135deg, #00ff88 0%, #00cc70 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '12px',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        flexShrink: 0
                    }}
                >
                    {datosEjercicio.completed ? (
                        <Check size={24} style={{ color: '#0a0e27' }} />
                    ) : (
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '6px'
                        }} />
                    )}
                </button>
            </div>

            {/* Notes Section */}
            {estaEditando ? (
                <div>
                    <textarea
                        placeholder="Añade tus comentarios..."
                        value={datosEjercicio.notes}
                        onChange={(e) => onActualizarNotas(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            padding: '10px',
                            color: 'white',
                            fontSize: '13px',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                            minHeight: '60px'
                        }}
                    />
                    <button
                        onClick={enGuardarNotas}
                        style={{
                            background: '#00d4ff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: '#0a0e27',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginTop: '8px',
                            width: '100%'
                        }}
                    >
                        Guardar nota
                    </button>
                </div>
            ) : (
                <>
                    {datosEjercicio.notes ? (
                        <div style={{
                            background: 'rgba(0, 212, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '10px',
                            marginTop: '8px'
                        }}>
                            <div style={{
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: '11px',
                                marginBottom: '4px'
                            }}>
                                TUS NOTAS:
                            </div>
                            <div style={{
                                color: '#00d4ff',
                                fontSize: '13px'
                            }}>
                                {datosEjercicio.notes}
                            </div>
                        </div>
                    ) : null}
                    <button
                        onClick={enEditarNotas}
                        style={{
                            background: 'transparent',
                            border: '1px dashed rgba(255, 255, 255, 0.3)',
                            borderRadius: '8px',
                            padding: '8px',
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '12px',
                            cursor: 'pointer',
                            marginTop: '8px',
                            width: '100%',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                            e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            e.target.style.color = 'rgba(255, 255, 255, 0.5)';
                        }}
                    >
                        + Añadir comentario
                    </button>
                </>
            )}
        </div>
    );
};

export default ExerciseCard;
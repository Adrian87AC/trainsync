import React from 'react';
import { Check } from 'lucide-react';
import './CartaEjercicio.css';

const CartaEjercicio = ({
    ejercicio,
    datosEjercicio,
    estaEditando,
    alAlternarCompletado,
    enEditarNotas,
    enGuardarNotas,
    enActualizarNotas
}) => {
    return (
        <div
            className={`carta-ejercicio-container ${datosEjercicio.completed ? 'carta-ejercicio-completed' : 'carta-ejercicio-incomplete'}`}
        >
            <div className="carta-header">
                <div className="ejercicio-info">
                    <div className="ejercicio-name">
                        {ejercicio?.name}
                    </div>
                    <div className="ejercicio-details">
                        {datosEjercicio.sets} series × {datosEjercicio.reps} reps
                    </div>
                    <div className="ejercicio-weight">
                        💪 {datosEjercicio.weight} kg
                    </div>
                </div>

                <button
                    onClick={alAlternarCompletado}
                    className={`check-button ${datosEjercicio.completed ? 'check-button-completed' : 'check-button-incomplete'}`}
                >
                    {datosEjercicio.completed ? (
                        <Check size={24} className="check-icon" />
                    ) : (
                        <div className="check-placeholder" />
                    )}
                </button>
            </div>

            {/* Sección de Notas */}
            {estaEditando ? (
                <div>
                    <textarea
                        placeholder="Añade tus comentarios..."
                        value={datosEjercicio.notes}
                        onChange={(e) => enActualizarNotas(e.target.value)}
                        className="notes-editor-textarea"
                    />
                    <button
                        onClick={enGuardarNotas}
                        className="save-notes-button"
                    >
                        Guardar nota
                    </button>
                </div>
            ) : (
                <>
                    {datosEjercicio.notes ? (
                        <div className="notes-display">
                            <div className="notes-label">
                                TUS NOTAS:
                            </div>
                            <div className="notes-content">
                                {datosEjercicio.notes}
                            </div>
                        </div>
                    ) : null}
                    <button
                        onClick={enEditarNotas}
                        className="add-notes-button"
                    >
                        + Añadir comentario
                    </button>
                </>
            )}
        </div>
    );
};

export default CartaEjercicio;

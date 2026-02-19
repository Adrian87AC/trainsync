import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, Dumbbell, Save } from 'lucide-react';
import './ConstructorRutinas.css';

const ConstructorRutinas = ({ clientes, ejercicios, alGuardar, alCancelar }) => {
    const [nombre, setNombre] = useState('');
    const [idCliente, setIdCliente] = useState('');
    const [dias, setDias] = useState([{ day_name: '', exercises: [] }]);

    const agregarDia = () => {
        setDias([...dias, { day_name: '', exercises: [] }]);
    };

    const eliminarDia = (indice) => {
        setDias(dias.filter((_, i) => i !== indice));
    };

    const actualizarNombreDia = (indice, valor) => {
        const nuevosDias = [...dias];
        nuevosDias[indice].day_name = valor;
        setDias(nuevosDias);
    };

    const agregarEjercicioAlDia = (indiceDia) => {
        const nuevosDias = [...dias];
        nuevosDias[indiceDia].exercises.push({
            exerciseId: ejercicios[0]?.id || '',
            sets: 3,
            reps: '10',
            weight: 0
        });
        setDias(nuevosDias);
    };

    const eliminarEjercicioDelDia = (indiceDia, indiceEjercicio) => {
        const nuevosDias = [...dias];
        nuevosDias[indiceDia].exercises.splice(indiceEjercicio, 1);
        setDias(nuevosDias);
    };

    const actualizarEjercicio = (indiceDia, indiceEjercicio, campo, valor) => {
        const nuevosDias = [...dias];
        nuevosDias[indiceDia].exercises[indiceEjercicio][campo] = valor;
        setDias(nuevosDias);
    };

    const manejarGuardar = () => {
        if (!nombre || !idCliente || dias.length === 0) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        const datosRutina = {
            name: nombre,
            client_id: parseInt(idCliente),
            days: dias
        };
        alGuardar(datosRutina);
    };

    return (
        <div className="constructor-rutinas-overlay">
            <div className="constructor-rutinas-modal">
                {/* Header */}
                <div className="constructor-header">
                    <h2 className="constructor-title">Nueva Rutina</h2>
                    <button onClick={alCancelar} className="close-button">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="constructor-body">
                    {/* Info Básica */}
                    <div className="basic-info-grid">
                        <div>
                            <label className="input-label">Nombre de la Rutina</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ej: Hipertrofia PPL"
                                className="text-input"
                            />
                        </div>
                        <div>
                            <label className="input-label">Cliente</label>
                            <select
                                value={idCliente}
                                onChange={(e) => setIdCliente(e.target.value)}
                                className="select-input"
                            >
                                <option value="">Seleccionar Cliente</option>
                                {clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>{cliente.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Días */}
                    <div className="days-list">
                        {dias.map((dia, indiceDia) => (
                            <div key={indiceDia} className="day-card">
                                <div className="day-header">
                                    <div className="day-title-container">
                                        <Calendar size={20} className="day-icon" />
                                        <input
                                            type="text"
                                            value={dia.day_name}
                                            onChange={(e) => actualizarNombreDia(indiceDia, e.target.value)}
                                            placeholder="Nombre del día (Ej: Lunes - Pecho)"
                                            className="day-name-input"
                                        />
                                    </div>
                                    <button onClick={() => eliminarDia(indiceDia)} className="remove-day-button">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Ejercicios */}
                                <div className="exercises-list">
                                    {dia.exercises.map((ej, indiceEjercicio) => (
                                        <div key={indiceEjercicio} className="exercise-row">
                                            <select
                                                value={ej.exerciseId}
                                                onChange={(e) => actualizarEjercicio(indiceDia, indiceEjercicio, 'exerciseId', e.target.value)}
                                                className="exercise-select"
                                            >
                                                {ejercicios.map(e => (
                                                    <option key={e.id} value={e.id}>{e.name}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                value={ej.sets}
                                                onChange={(e) => actualizarEjercicio(indiceDia, indiceEjercicio, 'sets', e.target.value)}
                                                placeholder="Series"
                                                className="exercise-input"
                                            />
                                            <input
                                                type="text"
                                                value={ej.reps}
                                                onChange={(e) => actualizarEjercicio(indiceDia, indiceEjercicio, 'reps', e.target.value)}
                                                placeholder="Reps"
                                                className="exercise-input"
                                            />
                                            <input
                                                type="number"
                                                value={ej.weight}
                                                onChange={(e) => actualizarEjercicio(indiceDia, indiceEjercicio, 'weight', e.target.value)}
                                                placeholder="Kg"
                                                className="exercise-input"
                                            />
                                            <button onClick={() => eliminarEjercicioDelDia(indiceDia, indiceEjercicio)} className="remove-exercise-button">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => agregarEjercicioAlDia(indiceDia)}
                                        className="add-exercise-button"
                                    >
                                        <Plus size={16} /> Añadir Ejercicio
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={agregarDia}
                        className="add-day-button"
                    >
                        <Plus size={20} /> Añadir Día de Entrenamiento
                    </button>
                </div>

                {/* Footer */}
                <div className="constructor-footer">
                    <button
                        onClick={alCancelar}
                        className="cancel-button"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={manejarGuardar}
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

import React from 'react';
import { Clock } from 'lucide-react';
import CartaEjercicio from './CartaEjercicio';
import { useModeloCliente } from '../../viewmodels/useModeloCliente';
import { HeaderCliente } from '../header/Cabecera';
import PiePagina from '../footer/PiePagina';
import './VistaCliente.css';

const VistaCliente = ({
    usuario,
    rutinas,
    obtenerEjercicio,
    alternarCompletadoEjercicio,
    actualizarNotasEjercicio,
    alSalir
}) => {
    // Modelo de Vista - Gestiona el estado y valores calculados del cliente
    const modeloVista = useModeloCliente(rutinas);

    return (
        <div className="vista-cliente-container">
            {/* Cabecera */}
            <HeaderCliente
                usuario={usuario}
                completadosHoy={modeloVista.completadosHoy}
                alSalir={alSalir}
            />

            {/* Contenido */}
            <div className="vista-cliente-content">
                <h3 className="content-title">
                    Tu Entrenamiento de Hoy
                </h3>

                {modeloVista.rutinaSeleccionada && modeloVista.rutinaSeleccionada.days.map((dia, indiceDia) => (
                    <div key={indiceDia} className="day-section">
                        <div className="day-header">
                            <Clock size={16} className="clock-icon" />
                            <span className="day-name">
                                {dia.day_name}
                            </span>
                        </div>

                        <div className="exercises-list">
                            {dia.exercises.map((ej, indiceEjercicio) => (
                                <CartaEjercicio
                                    key={indiceEjercicio}
                                    ejercicio={obtenerEjercicio(ej.exerciseId)}
                                    datosEjercicio={ej}
                                    estaEditando={modeloVista.editandoNotas === `${indiceDia}-${indiceEjercicio}`}
                                    alAlternarCompletado={() => alternarCompletadoEjercicio(modeloVista.rutinaSeleccionada.id, indiceDia, indiceEjercicio)}
                                    enEditarNotas={() => modeloVista.setEditandoNotas(`${indiceDia}-${indiceEjercicio}`)}
                                    enGuardarNotas={() => modeloVista.setEditandoNotas(null)}
                                    enActualizarNotas={(notas) => actualizarNotasEjercicio(modeloVista.rutinaSeleccionada.id, indiceDia, indiceEjercicio, notas)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <PiePagina />
        </div>
    );
};

export default VistaCliente;

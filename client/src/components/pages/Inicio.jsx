import React from 'react';
import { User, Activity, TrendingUp } from 'lucide-react';
import Estadisticas from './Estadisticas';
import ListaClientes from './ListaClientes';
import ClientesRutinas from './ClientesRutinas';
import ConstructorRutinas from './ConstructorRutinas';
import { useModeloEntrenador } from '../../viewmodels/useModeloEntrenador';
import { HeaderEntrenador } from '../header/Cabecera';
import PiePagina from '../footer/PiePagina';
import './Inicio.css';

const Inicio = ({
    usuario,
    datos,
    obtenerRutinasPorCliente,
    obtenerEjercicio,
    alSalir,
    alGuardarRutina
}) => {
    // Modelo de Vista - Gestiona el estado y lógica del entrenador
    const modeloVista = useModeloEntrenador(datos, usuario, alGuardarRutina);

    return (
        <div className="inicio-container">
            {/* Header */}
            <HeaderEntrenador usuario={usuario} alSalir={alSalir} />

            {/* Contenido Principal */}
            <div className="inicio-content">
                {/* Tarjetas de Estadísticas */}
                <div className="stats-grid">
                    <Estadisticas
                        icono={<User size={24} />}
                        etiqueta="Clientes Activos"
                        valor={modeloVista.clientes.length}
                        color="#00d4ff"
                    />
                    <Estadisticas
                        icono={<Activity size={24} />}
                        etiqueta="Rutinas Creadas"
                        valor={datos.routines.length}
                        color="#7b2ff7"
                    />
                    <Estadisticas
                        icono={<TrendingUp size={24} />}
                        etiqueta="Ejercicios Completados"
                        valor="87%"
                        color="#00ff88"
                    />
                </div>

                {/* Lista de Clientes */}
                <ListaClientes
                    clientes={modeloVista.clientes}
                    clienteSeleccionado={modeloVista.clienteSeleccionado}
                    setClienteSeleccionado={modeloVista.setClienteSeleccionado}
                    obtenerRutinasPorCliente={obtenerRutinasPorCliente}
                />

                {/* Rutinas del Cliente Seleccionado */}
                {modeloVista.clienteSeleccionado && (
                    <ClientesRutinas
                        cliente={modeloVista.clienteSeleccionado}
                        rutinas={obtenerRutinasPorCliente(modeloVista.clienteSeleccionado.id)}
                        obtenerEjercicio={obtenerEjercicio}
                        setMostrarConstructorRutinas={modeloVista.setMostrarConstructorRutinas}
                    />
                )}

                {/* Modal Constructor de Rutinas */}
                {modeloVista.mostrarConstructorRutinas && (
                    <div className="routine-builder-modal-overlay">
                        <ConstructorRutinas
                            clientes={datos.users.filter(u => u.role === 'client')}
                            ejercicios={datos.exercises}
                            alGuardar={modeloVista.manejarCrearRutina}
                            alCancelar={() => modeloVista.setMostrarConstructorRutinas(false)}
                        />
                    </div>
                )}
            </div>
            <PiePagina />
        </div>
    );
};

export default Inicio;

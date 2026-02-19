import React from 'react';
import PantallaLogin from './components/pages/PantallaLogin';
import Inicio from './components/pages/Inicio';
import VistaCliente from './components/pages/VistaCliente';
import { useModeloApp } from './viewmodels/useModeloApp';

const App = () => {
    // Modelo de Vista - Toda la lógica y estado de la aplicación
    const modeloApp = useModeloApp();

    // Estado de carga
    if (modeloApp.cargando) {
        return (
            <div style={{ color: 'white', padding: '20px' }}>
                Cargando datos...
            </div>
        );
    }

    // Vista - Lógica de presentación pura
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b3d 100%)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {modeloApp.vistaActual === 'login' && (
                <PantallaLogin
                    alIniciarSesion={modeloApp.manejarLogin}
                    usuarios={modeloApp.datos.users}
                />
            )}

            {modeloApp.vistaActual === 'trainer' && (
                <Inicio
                    usuario={modeloApp.usuarioActual}
                    datos={modeloApp.datos}
                    obtenerRutinasPorCliente={modeloApp.obtenerRutinasPorCliente}
                    obtenerEjercicio={modeloApp.obtenerEjercicio}
                    alSalir={modeloApp.manejarLogout}
                    alGuardarRutina={modeloApp.crearNuevaRutina}
                />
            )}

            {modeloApp.vistaActual === 'client' && (
                <VistaCliente
                    usuario={modeloApp.usuarioActual}
                    rutinas={modeloApp.obtenerRutinasPorCliente(modeloApp.usuarioActual.id)}
                    obtenerEjercicio={modeloApp.obtenerEjercicio}
                    alternarCompletadoEjercicio={modeloApp.alternarCompletadoEjercicio}
                    actualizarNotasEjercicio={modeloApp.actualizarNotasEjercicio}
                    alSalir={modeloApp.manejarLogout}
                />
            )}
        </div>
    );
};

export default App;
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
                    onLogin={modeloApp.manejarLogin}
                    usuarios={modeloApp.datos.users}
                />
            )}

            {modeloApp.vistaActual === 'trainer' && (
                <Inicio
                    user={modeloApp.usuarioActual}
                    data={modeloApp.datos}
                    getClientRoutines={modeloApp.obtenerRutinasPorCliente}
                    getExercise={modeloApp.obtenerEjercicio}
                    onLogout={modeloApp.manejarLogout}
                    onSaveRoutine={modeloApp.crearNuevaRutina}
                />
            )}

            {modeloApp.vistaActual === 'client' && (
                <VistaCliente
                    user={modeloApp.usuarioActual}
                    routines={modeloApp.obtenerRutinasPorCliente(modeloApp.usuarioActual.id)}
                    getExercise={modeloApp.obtenerEjercicio}
                    toggleExerciseCompletion={modeloApp.alternarCompletadoEjercicio}
                    updateExerciseNotes={modeloApp.actualizarNotasEjercicio}
                    onLogout={modeloApp.manejarLogout}
                />
            )}
        </div>
    );
};

export default App;
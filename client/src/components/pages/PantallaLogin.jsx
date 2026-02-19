import React from 'react';
import { Dumbbell, User } from 'lucide-react';
import './PantallaLogin.css';

const PantallaLogin = ({ onLogin, usuarios }) => {
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="trainsync-header">
                    <Dumbbell size={48} className="trainsync-logo" />
                    <h1 className="trainsync-title">TrainSync</h1>
                    <p className="trainsync-subtitle">
                        Gestión integral para entrenadores
                    </p>
                </div>

                <div className="user-selection">
                    <p className="user-selection-label">
                        Selecciona un usuario para demo:
                    </p>
                    {usuarios.map(usuario => (
                        <button
                            key={usuario.id}
                            onClick={() => onLogin(usuario.id)}
                            className={`user-button ${usuario.role === 'trainer' ? 'trainer-gradient' : 'client-gradient'}`}
                        >
                            <User size={20} />
                            <div>
                                <div>{usuario.name}</div>
                                <div className="user-info">
                                    {usuario.role === 'trainer' ? '🎯 Entrenador' : '💪 Cliente'}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PantallaLogin;

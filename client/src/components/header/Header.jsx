import React from 'react';
import { Dumbbell, Menu, Activity } from 'lucide-react';
import './Header.css';

// Header para la vista del Entrenador (Inicio)
export const HeaderEntrenador = ({ user, onLogout }) => {
    return (
        <div className="header-entrenador">
            <div className="header-logo-container">
                <Dumbbell size={28} className="header-logo-icon" />
                <h2 className="header-title">TrainSync Coach</h2>
            </div>
            <div className="header-user-actions">
                <div className="header-user-info">
                    <div className="header-user-name">{user.name}</div>
                    <div className="header-user-role">Entrenador Pro</div>
                </div>
                <button onClick={onLogout} className="header-logout-button">
                    Salir
                </button>
            </div>
        </div>
    );
};

// Header para la vista del Cliente (VistaCliente)
export const HeaderCliente = ({ user, completedToday, onLogout }) => {
    return (
        <div className="header-cliente">
            <div className="header-cliente-top-row">
                <div>
                    <div className="header-greeting-text">Hola,</div>
                    <div className="header-user-name-display">
                        {user.name.split(' ')[0]} 💪
                    </div>
                </div>
                <button onClick={onLogout} className="header-menu-button">
                    <Menu size={20} className="header-menu-icon" />
                </button>
            </div>

            <div className="header-daily-progress-card">
                <div className="header-activity-icon-container">
                    <Activity size={28} className="header-activity-icon" />
                </div>
                <div>
                    <div className="header-progress-number">{completedToday}</div>
                    <div className="header-progress-label">Ejercicios completados hoy</div>
                </div>
            </div>
        </div>
    );
};

export default HeaderEntrenador;

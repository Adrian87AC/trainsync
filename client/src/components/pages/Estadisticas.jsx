import React from 'react';
import './Estadisticas.css';

const Estadisticas = ({ icon, label, value, color }) => {
    return (
        <div
            className="estadisticas-card"
        >
            <div
                className="estadisticas-icon"
                style={{ color: color }}
            >
                {icon}
            </div>
            <div className="estadisticas-value">
                {value}
            </div>
            <div className="estadisticas-label">
                {label}
            </div>
        </div>
    );
};

export default Estadisticas;
import React from 'react';
import './Estadisticas.css';

const Estadisticas = ({ icono, etiqueta, valor, color }) => {
    return (
        <div
            className="estadisticas-card"
        >
            <div
                className="estadisticas-icon"
                style={{ color: color }}
            >
                {icono}
            </div>
            <div className="estadisticas-value">
                {valor}
            </div>
            <div className="estadisticas-label">
                {etiqueta}
            </div>
        </div>
    );
};

export default Estadisticas;
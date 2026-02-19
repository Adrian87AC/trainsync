import React from 'react';
import { Dumbbell } from 'lucide-react';
import './PiePagina.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-logo">
                    <Dumbbell size={18} className="footer-logo-icon" />
                    <span className="footer-brand">TrainSync</span>
                </div>
                <p className="footer-text">
                    &copy; {new Date().getFullYear()} TrainSync. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

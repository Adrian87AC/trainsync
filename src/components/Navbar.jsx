import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { LogOut, User, Shield, Activity, Lock, UserMinus } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción borrará todas tus rutinas y datos de progreso de forma permanente.')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete('http://localhost:5000/api/auth/delete-account', {
                headers: { Authorization: `Bearer ${token}` }
            });
            logout();
            navigate('/login');
            alert('Cuenta eliminada con éxito.');
        } catch (err) {
            alert('Error al intentar eliminar la cuenta.');
        }
    };

    if (!user) return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-50 shadow-sm py-3 mb-0" style={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', zIndex: 1050, position: 'relative' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <Activity className="me-2 text-primary" />
                    TrainSync
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Dashboard</Link>
                        </li>
                        {user.role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center text-warning" to="/admin">
                                    <Shield size={16} className="me-1" /> Admin
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center">
                        <div className="text-light me-3 d-none d-md-block text-end">
                            <div className="small fw-bold">{user.name}</div>
                            <div className="small opacity-50 text-uppercase" style={{ fontSize: '0.7rem' }}>{user.role === 'trainer' ? 'Coach' : user.role}</div>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-outline-light rounded-circle p-2 me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <User size={20} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
                                <li className="dropdown-header text-uppercase small fw-bold opacity-50">Configuración</li>
                                <li>
                                    <Link className="dropdown-item d-flex align-items-center py-2" to="/change-password">
                                        <Lock size={16} className="me-2" /> Cambiar Contraseña
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider opacity-10" /></li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center text-danger py-2" onClick={handleLogout}>
                                        <LogOut size={16} className="me-2" /> Cerrar Sesión
                                    </button>
                                </li>
                                <li><hr className="dropdown-divider opacity-10" /></li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center text-danger py-2 opacity-50" onClick={handleDeleteAccount}>
                                        <UserMinus size={16} className="me-2" /> Darme de baja
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

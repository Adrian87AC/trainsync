import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Shield, Activity } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 mb-4">
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
                        <li className="nav-nav-item">
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
                            <button className="btn btn-outline-light rounded-circle p-2" type="button" onClick={handleLogout}>
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

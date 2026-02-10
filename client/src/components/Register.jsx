import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, User, Mail, Lock, Loader2, Users } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'client'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            navigate('/login', { state: { message: 'Registro exitoso! Por favor inicia sesión.' } });
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-lg border-0" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                            <UserPlus className="text-success" size={32} />
                        </div>
                        <h2 className="fw-bold">Crear Cuenta</h2>
                        <p className="text-muted">Únete a la comunidad TrainSync</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <small>{error}</small>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Nombre Completo</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0"><User size={18} className="text-muted" /></span>
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control bg-light border-0"
                                    placeholder="Ej: Juan Pérez"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0"><Mail size={18} className="text-muted" /></span>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control bg-light border-0"
                                    placeholder="correo@ejemplo.com"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Contraseña</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0"><Lock size={18} className="text-muted" /></span>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control bg-light border-0"
                                    placeholder="Mínimo 6 caracteres"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-semibold">Tipo de Usuario</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0"><Users size={18} className="text-muted" /></span>
                                <select
                                    name="role"
                                    className="form-select bg-light border-0"
                                    onChange={handleChange}
                                    value={formData.role}
                                >
                                    <option value="client">Cliente</option>
                                    <option value="trainer">Entrenador (Coach)</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 py-2 fw-bold shadow-sm"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Registrarse'}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="small text-muted mb-0">
                            ¿Ya tienes cuenta? <Link to="/login" className="text-primary text-decoration-none fw-bold">Inicia Sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

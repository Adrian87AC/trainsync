import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                            <LogIn className="text-primary" size={32} />
                        </div>
                        <h2 className="fw-bold">Bienvenido</h2>
                        <p className="text-muted">Inicia sesión en TrainSync</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <small>{error}</small>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0"><User size={18} className="text-muted" /></span>
                                <input
                                    type="email"
                                    className="form-control bg-light border-0"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-semibold">Contraseña</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0"><Lock size={18} className="text-muted" /></span>
                                <input
                                    type="password"
                                    className="form-control bg-light border-0"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="small text-muted mb-0">
                            ¿No tienes cuenta? <Link to="/register" className="text-primary text-decoration-none fw-bold">Regístrate</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

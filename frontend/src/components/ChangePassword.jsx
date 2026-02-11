import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Las nuevas contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/auth/change-password',
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Error al cambiar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                                    <Lock className="text-primary" size={32} />
                                </div>
                                <h2 className="fw-bold h4">Cambiar Contraseña</h2>
                                <p className="text-muted small">Mantén tu cuenta segura actualizando tu contraseña regularmente</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger d-flex align-items-center small p-2 mb-3">
                                    <AlertCircle size={16} className="me-2" />
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success d-flex align-items-center small p-2 mb-3">
                                    <CheckCircle2 size={16} className="me-2" />
                                    Contraseña personalizada con éxito. Redirigiendo...
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Contraseña Actual</label>
                                    <input
                                        type="password"
                                        className="form-control bg-light border-0"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>

                                <hr className="my-4 opacity-10" />

                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control bg-light border-0"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        placeholder="Min. 6 caracteres"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-bold">Confirmar Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control bg-light border-0"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                                    disabled={loading || success}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Actualizar Contraseña'}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-link w-100 mt-2 text-muted text-decoration-none small"
                                    onClick={() => navigate('/')}
                                    disabled={loading || success}
                                >
                                    Volver
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;

import React from 'react';
import { useAdminViewModel } from '../viewmodels/useAdminViewModel';
import { Users, UserCog, UserMinus, Shield, ShieldCheck, UserCheck, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const {
        users,
        loading,
        error,
        handleDelete,
        updateUserRole,
        handleAssignTrainer
    } = useAdminViewModel();

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold h3 mb-0 text-white">Panel de Administración</h1>
                    <p className="text-white-50">Gestiona cuentas de coaches y clientes</p>
                </div>
                <div className="bg-primary text-white p-3 rounded-4 shadow-sm">
                    <Users size={32} />
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3 border-0">Usuario</th>
                                <th className="py-3 border-0">Email</th>
                                <th className="py-3 border-0">Rol</th>
                                <th className="py-3 border-0">Entrenador</th>
                                <th className="py-3 border-0 text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className={`p-2 rounded-circle me-3 ${u.role === 'admin' ? 'bg-danger bg-opacity-10 text-danger' :
                                                u.role === 'trainer' ? 'bg-primary bg-opacity-10 text-primary' :
                                                    'bg-success bg-opacity-10 text-success'
                                                }`}>
                                                {u.role === 'admin' ? <Shield size={20} /> :
                                                    u.role === 'trainer' ? <UserCog size={20} /> :
                                                        <UserCheck size={20} />}
                                            </div>
                                            <span className="fw-semibold text-dark">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-muted">{u.email}</td>
                                    <td className="py-3">
                                        <span className={`badge rounded-pill fw-normal px-3 py-2 ${u.role === 'admin' ? 'bg-danger' :
                                            u.role === 'trainer' ? 'bg-primary' :
                                                'bg-success'
                                            }`}>
                                            {u.role === 'admin' ? 'Administrador' :
                                                u.role === 'trainer' ? 'Coach' :
                                                    'Cliente'}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        {u.role === 'client' ? (
                                            <select
                                                className="form-select form-select-sm border-0 bg-light"
                                                value={u.trainer_id || ''}
                                                onChange={(e) => handleAssignTrainer(u.id, e.target.value)}
                                                style={{ minWidth: '150px' }}
                                            >
                                                <option value="">Sin entrenador</option>
                                                {users.filter(t => t.role === 'trainer').map(t => (
                                                    <option key={t.id} value={t.id}>{t.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span className="text-muted small">—</span>
                                        )}
                                    </td>
                                    <td className="py-3 text-end pe-4">
                                        <div className="dropdown d-inline-block">
                                            <button className="btn btn-light btn-sm rounded-3 me-2 border" type="button" onClick={() => {
                                                const newRole = u.role === 'client' ? 'trainer' : 'client';
                                                updateUserRole(u, newRole);
                                            }}>
                                                Cambiar a {u.role === 'client' ? 'Coach' : 'Cliente'}
                                            </button>
                                            {u.role !== 'admin' && (
                                                <button className="btn btn-outline-danger btn-sm rounded-3" onClick={() => handleDelete(u.id)}>
                                                    <UserMinus size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

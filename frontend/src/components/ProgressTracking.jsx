import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Plus, Calendar, Scale, Ruler, Activity, ChevronRight, Save, X } from 'lucide-react';

const ProgressTracking = ({ userId }) => {
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        body_fat: '',
        chest: '',
        waist: '',
        hips: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchMeasurements();
    }, [userId]);

    const fetchMeasurements = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/measurements/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMeasurements(response.data);
        } catch (err) {
            console.error('Error fetching measurements', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/measurements',
                { ...formData, user_id: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowForm(false);
            fetchMeasurements();
        } catch (err) {
            alert('Error al guardar medición');
        }
    };

    if (loading) return <div className="text-white opacity-50 p-4">Cargando progreso...</div>;

    const latest = measurements[0] || {};
    const hasData = measurements.length > 0;

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-white mb-0 h5 d-flex align-items-center gap-2">
                    <TrendingUp className="text-primary" size={24} />
                    Mi Progreso Físico
                </h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 rounded-pill px-3"
                >
                    {showForm ? <X size={16} /> : <Plus size={16} />}
                    {showForm ? 'Cancelar' : 'Nueva Medida'}
                </button>
            </div>

            {showForm && (
                <div className="card border-0 rounded-4 mb-4 shadow" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <form onSubmit={handleSubmit} className="card-body p-4 text-white">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label small opacity-75">Peso (kg)</label>
                                <input type="number" step="0.1" className="form-control bg-dark text-white border-secondary" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label small opacity-75">Altura (cm)</label>
                                <input type="number" className="form-control bg-dark text-white border-secondary" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label small opacity-75">% Grasa</label>
                                <input type="number" step="0.1" className="form-control bg-dark text-white border-secondary" value={formData.body_fat} onChange={e => setFormData({ ...formData, body_fat: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label small opacity-75">Cintura (cm)</label>
                                <input type="number" step="0.1" className="form-control bg-dark text-white border-secondary" value={formData.waist} onChange={e => setFormData({ ...formData, waist: e.target.value })} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label small opacity-75">Fecha</label>
                                <input type="date" className="form-control bg-dark text-white border-secondary" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="col-12 text-end">
                                <button type="submit" className="btn btn-primary rounded-pill px-4 py-2">
                                    <Save size={18} className="me-2" /> Guardar Medición
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {hasData ? (
                <div className="row g-3 mb-4">
                    <div className="col-6 col-md-3">
                        <div className="bg-white p-3 rounded-4 shadow-sm text-center border-0">
                            <Scale className="text-primary mb-2" size={20} />
                            <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Peso Actual</div>
                            <div className="h4 text-dark mb-0 fw-bold">{latest.weight} <small className="fs-6 fw-normal">kg</small></div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="bg-white p-3 rounded-4 shadow-sm text-center border-0">
                            <Activity className="text-success mb-2" size={20} />
                            <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>% Grasa</div>
                            <div className="h4 text-dark mb-0 fw-bold">{latest.body_fat}%</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white bg-opacity-5 p-5 rounded-4 border border-white border-opacity-10 text-center text-white-50">
                    No hay registros de progreso todavía. ¡Empieza hoy mismo!
                </div>
            )}

            {hasData && (
                <div className="table-responsive rounded-4 overflow-hidden border border-white border-opacity-10">
                    <table className="table table-dark table-hover mb-0 align-middle shadow-sm">
                        <thead className="bg-white bg-opacity-5">
                            <tr>
                                <th className="px-4 py-3 border-0 small opacity-50">Fecha</th>
                                <th className="py-3 border-0 small opacity-50">Peso</th>
                                <th className="py-3 border-0 small opacity-50">Cintura</th>
                                <th className="py-3 border-0 small opacity-50">% Grasa</th>
                                <th className="py-3 border-0 text-end pe-4 border-0"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {measurements.map(m => (
                                <tr key={m.id} className="border-bottom border-white border-opacity-5">
                                    <td className="px-4 py-3 d-flex align-items-center gap-2">
                                        <Calendar size={14} className="text-primary opacity-50" />
                                        {new Date(m.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 fw-bold">{m.weight}kg</td>
                                    <td className="py-3">{m.waist}cm</td>
                                    <td className="py-3">{m.body_fat}%</td>
                                    <td className="py-3 text-end pe-4">
                                        <ChevronRight size={16} className="opacity-25" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProgressTracking;

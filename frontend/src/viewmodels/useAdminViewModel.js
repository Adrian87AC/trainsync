import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useAdminViewModel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            setError('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            alert('Error al eliminar usuario');
        }
    };

    const updateUserRole = async (user, newRole) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/admin/users/${user.id}`,
                { ...user, role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (err) {
            alert('Error al actualizar rol');
        }
    };

    const handleAssignTrainer = async (userId, trainerId) => {
        try {
            const token = localStorage.getItem('token');
            const user = users.find(u => u.id === userId);
            await axios.put(`${API_URL}/admin/users/${userId}`,
                { ...user, trainer_id: trainerId ? parseInt(trainerId) : null },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (err) {
            alert('Error al asignar entrenador');
        }
    };

    return {
        users,
        loading,
        error,
        handleDelete,
        updateUserRole,
        handleAssignTrainer,
        fetchUsers
    };
};

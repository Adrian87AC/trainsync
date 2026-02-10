const API_URL = 'http://localhost:5000/api';

export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
};

export const fetchExercises = async () => {
    const response = await fetch(`${API_URL}/exercises`);
    if (!response.ok) throw new Error('Failed to fetch exercises');
    return response.json();
};

export const fetchRoutines = async () => {
    const response = await fetch(`${API_URL}/routines`);
    if (!response.ok) throw new Error('Failed to fetch routines');
    return response.json();
};

export const createRoutine = async (routineData) => {
    const response = await fetch(`${API_URL}/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(routineData)
    });
    if (!response.ok) throw new Error('Failed to create routine');
    return response.json();
};

export const updateCompletion = async (id, completed) => {
    const response = await fetch(`${API_URL}/completion/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });
    if (!response.ok) throw new Error('Failed to update completion');
    return response.json();
};

export const updateNotes = async (id, notes) => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
    });
    if (!response.ok) throw new Error('Failed to update notes');
    return response.json();
};

export const initialData = {
    users: [
        { id: 1, name: 'Coach Carlos', role: 'trainer', email: 'carlos@trainsync.com' },
        { id: 2, name: 'María López', role: 'client', trainerId: 1, email: 'maria@example.com' },
        { id: 3, name: 'Juan Pérez', role: 'client', trainerId: 1, email: 'juan@example.com' }
    ],
    exercises: [
        { id: 1, name: 'Press Banca', muscleGroup: 'Pecho', videoUrl: 'https://youtube.com/...' },
        { id: 2, name: 'Sentadilla', muscleGroup: 'Piernas', videoUrl: 'https://youtube.com/...' },
        { id: 3, name: 'Peso Muerto', muscleGroup: 'Espalda', videoUrl: 'https://youtube.com/...' },
        { id: 4, name: 'Press Militar', muscleGroup: 'Hombros', videoUrl: 'https://youtube.com/...' },
        { id: 5, name: 'Dominadas', muscleGroup: 'Espalda', videoUrl: 'https://youtube.com/...' },
        { id: 6, name: 'Curl Bíceps', muscleGroup: 'Brazos', videoUrl: 'https://youtube.com/...' }
    ],
    routines: [
        {
            id: 1,
            name: 'Hipertrofia Base',
            clientId: 2,
            trainerId: 1,
            days: [
                {
                    dayName: 'Lunes - Pecho y Tríceps',
                    exercises: [
                        { exerciseId: 1, sets: 4, reps: '8-10', weight: 60, completed: true, notes: 'Sentí buen bombeo' },
                        { exerciseId: 4, sets: 3, reps: '10-12', weight: 40, completed: true, notes: '' }
                    ]
                },
                {
                    dayName: 'Miércoles - Piernas',
                    exercises: [
                        { exerciseId: 2, sets: 4, reps: '6-8', weight: 100, completed: false, notes: '' },
                        { exerciseId: 3, sets: 3, reps: '8-10', weight: 120, completed: false, notes: '' }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Fuerza General',
            clientId: 3,
            trainerId: 1,
            days: [
                {
                    dayName: 'Martes - Full Body',
                    exercises: [
                        { exerciseId: 2, sets: 5, reps: '5', weight: 140, completed: true, notes: 'PR!' },
                        { exerciseId: 5, sets: 3, reps: '6-8', weight: 0, completed: false, notes: '' },
                        { exerciseId: 6, sets: 3, reps: '10', weight: 15, completed: false, notes: '' }
                    ]
                }
            ]
        }
    ]
};
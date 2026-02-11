const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function initDB() {
    try {
        // Connect to MySQL server (without database selected first)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        console.log('Connected to MySQL server.');

        // Read schema file
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        // Split by semicolon to get individual queries (basic splitting)
        const queries = schema.split(';').filter(q => q.trim() !== '');

        for (const query of queries) {
            if (query.trim()) {
                await connection.query(query);
                console.log('Executed query.');
            }
        }

        // Seed Users with hashed passwords
        const users = [
            { id: 1, name: 'Admin', email: 'admin@trainsync.com', password: 'admin123', role: 'admin', trainer_id: null },
            { id: 2, name: 'Coach Carlos', email: 'carlos@trainsync.com', password: 'coach123', role: 'trainer', trainer_id: null },
            { id: 3, name: 'María López', email: 'maria@example.com', password: 'client123', role: 'client', trainer_id: 2 },
            { id: 4, name: 'Juan Pérez', email: 'juan@example.com', password: 'client123', role: 'client', trainer_id: 2 },
            { id: 5, name: 'Coach Roberto', email: 'roberto@trainsync.com', password: 'coach123', role: 'trainer', trainer_id: null }
        ];

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await connection.query(
                'INSERT INTO users (id, name, email, password, role, trainer_id) VALUES (?, ?, ?, ?, ?, ?)',
                [user.id, user.name, user.email, hashedPassword, user.role, user.trainer_id]
            );
        }

        // Seed Exercises
        const exercises = [
            // PECHO (Mancuernas, Poleas, Discos/Barra)
            [1, 'Press Banca con Barra', 'Pecho', 'https://youtube.com/watch?v=tuwHzzPrzSA'],
            [2, 'Press Superior con Mancuernas', 'Pecho', 'https://youtube.com/watch?v=8iP3qD-I8y0'],
            [3, 'Aperturas en Polea Alta', 'Pecho', 'https://youtube.com/watch?v=f7G6E-lH23Q'],
            [4, 'Aperturas en Polea Baja', 'Pecho', 'https://youtube.com/watch?v=f7G6E-lH23Q'],
            [5, 'Cruces en Polea (Media)', 'Pecho', 'https://youtube.com/watch?v=f7G6E-lH23Q'],
            [6, 'Press inclinado con Barra', 'Pecho', 'https://youtube.com/watch?v=SrqOu55lr6A'],
            [7, 'Press declinado con Barra', 'Pecho', 'https://youtube.com/watch?v=LfyQBUKR8SE'],
            [8, 'Aperturas con Mancuernas', 'Pecho', 'https://youtube.com/watch?v=eGjt4lk6g3w'],
            [9, 'Press con Mancuernas Plano', 'Pecho', 'https://youtube.com/watch?v=VmB1G1K7v94'],
            [10, 'Flexiones (Push-ups)', 'Pecho', 'https://youtube.com/watch?v=IODxDxX7oi4'],
            [11, 'Press cerrado para Pecho', 'Pecho', 'https://youtube.com/watch?v=nEF0bv2FW94'],
            [12, 'Pullover con Mancuerna', 'Pecho', 'https://youtube.com/watch?v=FK4pHuH268k'],

            // ESPALDA (Poleas, Pesos libres)
            [13, 'Peso Muerto Convencional', 'Espalda', 'https://youtube.com/watch?v=op9kVnSso6Q'],
            [14, 'Dominadas Pronas', 'Espalda', 'https://youtube.com/watch?v=eGo4IYlbE5g'],
            [15, 'Remo con Barra (Pendlay)', 'Espalda', 'https://youtube.com/watch?v=9efgcAjQW70'],
            [16, 'Jalón al Pecho (Agarre Ancho)', 'Espalda', 'https://youtube.com/watch?v=CAwf7n6Luuc'],
            [17, 'Remo Gironda (Polea Baja)', 'Espalda', 'https://youtube.com/watch?v=GZbfZ033f74'],
            [18, 'Remo con Mancuerna a una mano', 'Espalda', 'https://youtube.com/watch?v=dFzUjzuWUs0'],
            [19, 'Jalón al pecho (Agarre Neutro)', 'Espalda', 'https://youtube.com/watch?v=CAwf7n6Luuc'],
            [20, 'Remo en Polea Alta', 'Espalda', 'https://youtube.com/watch?v=CAwf7n6Luuc'],
            [21, 'Pullover en Polea Alta (Brazos rectos)', 'Espalda', 'https://youtube.com/watch?v=rep-qVOkqgk'],
            [22, 'Remo T con Barra', 'Espalda', 'https://youtube.com/watch?v=j3Igk5nyZE4'],
            [23, 'Hiperextensiones', 'Espalda', 'https://youtube.com/watch?v=ph3pddpKzzw'],
            [24, 'Remo con Mancuernas en Banco Inclinado', 'Espalda', 'https://youtube.com/watch?v=dFzUjzuWUs0'],

            // HOMBROS (Mancuernas y Poleas)
            [25, 'Press Militar con Barra', 'Hombros', 'https://youtube.com/watch?v=2yjwxt_fxy0'],
            [26, 'Elevaciones Laterales con Mancuerna', 'Hombros', 'https://youtube.com/watch?v=3VcKaXpzqRo'],
            [27, 'Press Arnold', 'Hombros', 'https://youtube.com/watch?v=6yMdhi2DVao'],
            [28, 'Face Pulls en Polea', 'Hombros', 'https://youtube.com/watch?v=rep-qVOkqgk'],
            [29, 'Elevaciones Laterales en Polea', 'Hombros', 'https://youtube.com/watch?v=3VcKaXpzqRo'],
            [30, 'Elevaciones Frontales con Disco', 'Hombros', 'https://youtube.com/watch?v=rep-qVOkqgk'],
            [31, 'Pájaros con Mancuerna (Vuelos posteriores)', 'Hombros', 'https://youtube.com/watch?v=6yMdhi2DVao'],
            [32, 'Press con Mancuernas Sentado', 'Hombros', 'https://youtube.com/watch?v=qEwK_EvVOk4'],
            [33, 'Remo al Mentón con Barra', 'Hombros', 'https://youtube.com/watch?v=IhZLP9W9A-E'],
            [34, 'Encogimientos con Mancuernas (Trapecio)', 'Hombros', 'https://youtube.com/watch?v=cJRVVxPf7O8'],

            // PIERNAS (Discos, Mancuernas, Máquinas)
            [35, 'Sentadilla con Barra (Trasera)', 'Piernas', 'https://youtube.com/watch?v=X0qCAtZ6OQE'],
            [36, 'Sentadilla Frontal', 'Piernas', 'https://youtube.com/watch?v=v-mQm_jmZ_g'],
            [37, 'Prensa de Piernas vertical', 'Piernas', 'https://youtube.com/watch?v=Osh_S-m9L28'],
            [38, 'Zancadas con Mancuernas', 'Piernas', 'https://youtube.com/watch?v=D7KaRcUTQeE'],
            [39, 'Peso Muerto Rumano con Barra', 'Piernas', 'https://youtube.com/watch?v=JCXUYuzwZ_M'],
            [40, 'Peso Muerto Rumano con Mancuernas', 'Piernas', 'https://youtube.com/watch?v=JCXUYuzwZ_M'],
            [41, 'Extensión de Cuádriceps', 'Piernas', 'https://youtube.com/watch?v=m0FOpMEgero'],
            [42, 'Curl Femoral Tumbado', 'Piernas', 'https://youtube.com/watch?v=1Tq3QdYqfTo'],
            [43, 'Hip Thrust con Barra (Glúteo)', 'Piernas', 'https://youtube.com/watch?v=LM8LG0VwTnk'],
            [44, 'Sentadilla Búlgara con Mancuerna', 'Piernas', 'https://youtube.com/watch?v=D7KaRcUTQeE'],
            [45, 'Elevación de Gemelos en Máquina', 'Piernas', 'https://youtube.com/watch?v=3UWi44yN-wM'],
            [46, 'Aductores en Máquina', 'Piernas', 'https://youtube.com/watch?v=3UWi44yN-wM'],
            [47, 'Abductores en Máquina', 'Piernas', 'https://youtube.com/watch?v=3UWi44yN-wM'],
            [48, 'Sentadilla Goblet con Mancuerna', 'Piernas', 'https://youtube.com/watch?v=MeIiGibT69I'],

            // BÍCEPS (Mancuernas y Poleas)
            [49, 'Curl de Bíceps con Barra Z', 'Brazos', 'https://youtube.com/watch?v=kwG2ipFRgfo'],
            [50, 'Curl con Mancuernas (Alterno)', 'Brazos', 'https://youtube.com/watch?v=zC3nLlEvin4'],
            [51, 'Curl Martillo con Mancuernas', 'Brazos', 'https://youtube.com/watch?v=TwD-YGVP4Bk'],
            [52, 'Curl de Bíceps en Polea Baja', 'Brazos', 'https://youtube.com/watch?v=AsAd-uoy88Y'],
            [53, 'Curl Predicador con Barra Z', 'Brazos', 'https://youtube.com/watch?v=fIWP-fNqdGs'],
            [54, 'Curl Concentrado con Mancuerna', 'Brazos', 'https://youtube.com/watch?v=JvjKuAnM_m4'],
            [55, 'Curl de Bíceps inclinado (Mancuerna)', 'Brazos', 'https://youtube.com/watch?v=soxrZlIlGuA'],
            [56, 'Curl en Polea Alta (Doble brazo)', 'Brazos', 'https://youtube.com/watch?v=AsAd-uoy88Y'],
            [57, 'Curl tipo Spider', 'Brazos', 'https://youtube.com/watch?v=AsAd-uoy88Y'],

            // TRÍCEPS (Poleas y Pesos libres)
            [58, 'Press Francés con Barra Z', 'Brazos', 'https://youtube.com/watch?v=d_KZx7pknBw'],
            [59, 'Tríceps en Polea con Cuerda', 'Brazos', 'https://youtube.com/watch?v=2-LAMcpzHLU'],
            [60, 'Tríceps en Polea con Barra Recta', 'Brazos', 'https://youtube.com/watch?v=2-LAMcpzHLU'],
            [61, 'Extensiones sobre la cabeza (Mancuerna)', 'Brazos', 'https://youtube.com/watch?v=2-LAMcpzHLU'],
            [62, 'Extensiones sobre la cabeza (Polea)', 'Brazos', 'https://youtube.com/watch?v=2-LAMcpzHLU'],
            [63, 'Patada de Tríceps con Mancuerna', 'Brazos', 'https://youtube.com/watch?v=6SS6K3lAwZ8'],
            [64, 'Dips entre bancos', 'Brazos', 'https://youtube.com/watch?v=2z8JmcrW-As'],
            [65, 'Press de Banca Agarre Cerrado', 'Brazos', 'https://youtube.com/watch?v=nEF0bv2FW94'],

            // ANTEBRAZO
            [66, 'Curl de muñeca (Palmas arriba)', 'Antebrazo', 'https://youtube.com/watch?v=L2G6CshRAsM'],
            [67, 'Curl de muñeca (Palmas abajo)', 'Antebrazo', 'https://youtube.com/watch?v=L2G6CshRAsM'],
            [68, 'Paseo del Granjero (Mancuernas)', 'Antebrazo', 'https://youtube.com/watch?v=fODZ9Y3I2T0'],
            [69, 'Curl de Bíceps Inverso con Barra', 'Antebrazo', 'https://youtube.com/watch?v=L2G6CshRAsM'],

            // ABDOMINALES
            [70, 'Crunch Abdominal', 'Abdominales', 'https://youtube.com/watch?v=Xyd_f67FGV4'],
            [71, 'Elevación de Piernas colgado', 'Abdominales', 'https://youtube.com/watch?v=JB2oyawG9KI'],
            [72, 'Plancha Isométrica', 'Abdominales', 'https://youtube.com/watch?v=pSHjTRCQxIw'],
            [73, 'Rueda Abdominal', 'Abdominales', 'https://youtube.com/watch?v=rqiQtEW_0OY'],
            [74, 'Cable Woodchoppers (Hachazos)', 'Abdominales', 'https://youtube.com/watch?v=Lh7L-uS-Vq4'],
            [75, 'Russian Twists con Disco', 'Abdominales', 'https://youtube.com/watch?v=wkD8rjk6V6k'],
            [76, 'Crunch en Polea Alta', 'Abdominales', 'https://youtube.com/watch?v=Lh7L-uS-Vq4'],
            [77, 'Deadbug', 'Abdominales', 'https://youtube.com/watch?v=wkD8rjk6V6k']
        ];
        for (const ex of exercises) {
            await connection.query('INSERT INTO exercises (id, name, muscle_group, video_url) VALUES (?, ?, ?, ?)', ex);
        }

        // Seed Routines
        await connection.query('INSERT INTO routines (id, name, client_id, trainer_id) VALUES (1, "Hipertrofia Base", 3, 2)');
        await connection.query('INSERT INTO routines (id, name, client_id, trainer_id) VALUES (2, "Fuerza General", 4, 2)');

        // Seed Routine Days
        await connection.query('INSERT INTO routine_days (id, routine_id, day_name) VALUES (1, 1, "Lunes - Pecho y Tríceps")');
        await connection.query('INSERT INTO routine_days (id, routine_id, day_name) VALUES (2, 1, "Miércoles - Piernas")');
        await connection.query('INSERT INTO routine_days (id, routine_id, day_name) VALUES (3, 2, "Martes - Full Body")');

        // Seed Exercise Details
        const details = [
            [1, 1, 4, '8-10', 60, true, 'Sentí buen bombeo'],
            [1, 59, 3, '10-12', 15, true, ''],
            [2, 35, 4, '6-8', 100, false, ''],
            [2, 42, 3, '8-10', 40, false, ''],
            [3, 13, 5, '5', 140, true, 'PR!'],
            [3, 15, 3, '6-8', 60, false, ''],
            [3, 49, 3, '10', 15, false, '']
        ];
        for (const d of details) {
            await connection.query('INSERT INTO exercise_details (routine_day_id, exercise_id, sets, reps, weight, completed, notes) VALUES (?, ?, ?, ?, ?, ?, ?)', d);
        }

        // Seed Measurements for Maria
        const measurements = [
            [3, 65.5, 165, 22.4, 90, 70, 95, '2024-01-01'],
            [3, 64.8, 165, 21.8, 89, 68, 94, '2024-02-01']
        ];
        for (const m of measurements) {
            await connection.query('INSERT INTO measurements (user_id, weight, height, body_fat, chest, waist, hips, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', m);
        }

        console.log('Database, users, and data initialized successfully.');
        await connection.end();
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initDB();

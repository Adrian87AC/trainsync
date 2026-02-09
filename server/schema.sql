CREATE DATABASE IF NOT EXISTS trainsync;
USE trainsync;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('trainer', 'client') NOT NULL,
    trainer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trainer_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(100) NOT NULL,
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS routines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    client_id INT NOT NULL,
    trainer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (trainer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS routine_days (
    id INT AUTO_INCREMENT PRIMARY KEY,
    routine_id INT NOT NULL,
    day_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercise_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    routine_day_id INT NOT NULL,
    exercise_id INT NOT NULL,
    sets INT NOT NULL,
    reps VARCHAR(50) NOT NULL,
    weight FLOAT,
    completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (routine_day_id) REFERENCES routine_days(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- Seed Data (from mockData.js)
INSERT INTO users (id, name, email, role, trainer_id) VALUES 
(1, 'Coach Carlos', 'carlos@trainsync.com', 'trainer', NULL),
(2, 'María López', 'maria@example.com', 'client', 1),
(3, 'Juan Pérez', 'juan@example.com', 'client', 1)
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO exercises (id, name, muscle_group, video_url) VALUES
(1, 'Press Banca', 'Pecho', 'https://youtube.com/...'),
(2, 'Sentadilla', 'Piernas', 'https://youtube.com/...'),
(3, 'Peso Muerto', 'Espalda', 'https://youtube.com/...'),
(4, 'Press Militar', 'Hombros', 'https://youtube.com/...'),
(5, 'Dominadas', 'Espalda', 'https://youtube.com/...'),
(6, 'Curl Bíceps', 'Brazos', 'https://youtube.com/...')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO routines (id, name, client_id, trainer_id) VALUES
(1, 'Hipertrofia Base', 2, 1),
(2, 'Fuerza General', 3, 1)
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO routine_days (id, routine_id, day_name) VALUES
(1, 1, 'Lunes - Pecho y Tríceps'),
(2, 1, 'Miércoles - Piernas'),
(3, 2, 'Martes - Full Body')
ON DUPLICATE KEY UPDATE day_name=day_name;

INSERT INTO exercise_details (routine_day_id, exercise_id, sets, reps, weight, completed, notes) VALUES
(1, 1, 4, '8-10', 60, TRUE, 'Sentí buen bombeo'),
(1, 4, 3, '10-12', 40, TRUE, ''),
(2, 2, 4, '6-8', 100, FALSE, ''),
(2, 3, 3, '8-10', 120, FALSE, ''),
(3, 2, 5, '5', 140, TRUE, 'PR!'),
(3, 5, 3, '6-8', 0, FALSE, ''),
(3, 6, 3, '10', 15, FALSE, '');

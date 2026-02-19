const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
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

        console.log('Database initialized successfully.');
        await connection.end();
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initDB();

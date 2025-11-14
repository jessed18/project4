const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true
    });

    const promiseConnection = connection.promise();

    try {
        const sqlFile = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        
        console.log('Setting up database...');
        console.log('This will drop and recreate the database if it exists.');
        
        await promiseConnection.query(sqlFile);

        console.log('Database setup completed successfully!');
        console.log('Database: jess_schema');
        console.log('Tables created: users, categories, questions, answers');
        console.log('Sample data inserted.');
        
    } catch (error) {
        console.error('Error setting up database:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        connection.end();
    }
}

setupDatabase();
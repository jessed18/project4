// backend server
const express = require('express');
const cors = require('express-session');
const bcrypt = require('bcrypt.js');
require('dotenv').config();

const db = require('./db');
const app = express();

app.use(cors({
    origin: 'https://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// auth routes
// register
app.post('/api/register'. asunc (req, res)) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: 'Please provide username and password'});
        }

        if (password.length < 8) {
            return res.status(400).json({message: 'Password must be at least 8 characters'});
        }

        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({message: 'Username already exists'});
        }
   
        const hashedPassword = await bcrypt.hash(password, 10);
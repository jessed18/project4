// backend server
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = require('./db');

const app = express();


app.use(cors({
    origin: 'http://localhost:3000',
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
app.post('/api/register', async (req, res) => {  
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

        const [result] = await db.query(
            'INSERT INTO users (username, password) VALUES (?,?)',
            [username, hashedPassword]
        );

        // set session
        req.session.userId = result.insertId;
        req.session.username = username;

        res.status(201).json({
            message: 'Registration successful!',
            user: {id: result.insertId, username}  
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'server error'});
    }
});

// login
app.post('/api/login',  async (req, res) => {
    try {
        const { username, password } = req.body;  

        if (!username || !password) {
            return res.status(400).json({message: 'Please provide username and password'});
        }

        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const user = users[0];

        // check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({
            message: 'Login successful!',
            user: { id: user.id, username: user.username}
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// logout
app.post('/api/logout', (req,res) => {
    req.session.destroy();
    res.json({message: 'Logged out successfully'});
});

app.get('/api/check-auth',(req,res) => {
    if (req.session.userId) {
        res.json({
            isAuthenticated: true,
            user: {id: req.session.userId, username: req.session.username}
        });
    } else {
        res.json({isAuthenticated: false});
    }
});

// get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM categories ORDER BY name');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/api/questions', async (req, res) => {
    try {
        const { category_id } = req.query;

        let query = `
          SELECT q.*, c.name as category_name, c.icon, c.color,
          (SELECT COUNT(*) FROM answers WHERE question_id = q.id) as answer_count
          FROM questions q
          JOIN categories c ON q.category_id = c.id
          `;

          let params = [];

          if (category_id) {
            query += ' WHERE q.category_id = ?';
            params.push(category_id);
          }
          
          query += ' ORDER BY q.created_at DESC';

          const [questions] = await db.query(query,params);
          res.json(questions);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
});

app.get('/api/questions/:id', async (req,res) => {
    try {
        const {id} = req.params;

        const [questions] = await db.query(`
            SELECT q.*, c.name as category_name, c.icon, c.color
            FROM questions q
            JOIN categories c ON q.category_id = c.id
            WHERE q.id = ?
        `,[id]);

        if (questions.length === 0) {
            return res.status(404).json({message: 'Question not found!'});
        }

        const [answers] = await db.query(`
            SELECT * FROM answers
            WHERE question_id = ?
            ORDER BY created_at ASC
            `, [id]);
            
        res.json({
            question: questions[0],
            answers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// post a question
app.post('/api/questions', async (req, res) => { 
    try {
        if (!req.session.userId) {
            return res.status(401).json({message: 'Please login to post a question'});
        }

       const { title, content, category_id } = req.body;
    
       if (!title || !content || !category_id) {
            return res.status(400).json({ message: 'Please provide title, content, and category' });
       }

       const [result] = await db.query(
        'INSERT INTO questions (title, content, category_id, user_id, username) VALUES (?,?,?,?,?)',
        [title, content, category_id, req.session.userId, req.session.username]
       );

       res.status(201).json({
            message: 'Question posted successfully!',
            questionId: result.insertId
       });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'server error'});
    }
});

// post answer (requires login)
app.post('/api/answers', async (req, res) => {  
    try {
        if (!req.session.userId) {
            return res.status(401).json({message: 'Please login to post an answer'});
        }

        const { content, question_id } = req.body;

        if (!content || !question_id) {
            return res.status(400).json({message: 'Please provide content and question_id'});
        }

        const [result] = await db.query(
            'INSERT INTO answers (content, question_id, user_id, username) VALUES (?, ?, ?, ?)',
            [content, question_id, req.session.userId, req.session.username]
        );

        res.status(201).json({
            message: 'Answer posted successfully!',
            answerId: result.insertId  
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
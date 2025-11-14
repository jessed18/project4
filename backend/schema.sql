-- simple vexyn database

DROP DATABASE IF EXISTS jess_schema;

CREATE DATABASE jess_schema;

USE jess_schema;

-- users table

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- categories table

CREATE TABLE categories (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10) DEFAULT '💻',
    color VARCHAR(20) DEFAULT '#3b82f6'
);

-- questions table

CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO categories (name, color) VALUES
('JavaScript', '#f7df1e'),
('React', '#61dafb'),
('Node.js', '#339933'),
('CSS', '#1572b6'),
('Python', '#3776ab'),
('HTML', '#e34c26'),
('Java', '#ed8b00'),
('C++', '#00599c'),
('TypeScript', '#3178c6'),
('Vue.js', '#4fc08d'),
('Angular', '#dd0031'),
('SQL', '#336791'),
('PHP', '#777bb4'),
('Ruby', '#cc342d'),
('Go', '#00add8');

-- insert demo user (password is 'demo123' hashed with bcrypt)
INSERT INTO users (username, password) VALUES
('demo_user', '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZq');

-- insert questions

INSERT INTO questions (title, content, category_id, user_id, username) VALUES
('How do I center a div?', 'I have been trying to center a div but nothing works. Please help!', 4, 1, 'demo_user'),
('What is useState hook?', 'Can someone explain how useState works in React?', 2, 1, 'demo_user'),
('Best way to learn JavaScript?', 'I am new to programming. What is the best way to start with JavaScript?', 1, 1, 'demo_user');

-- insert answers

INSERT INTO answers (content, question_id, user_id, username) VALUES
('You can use flexbox! Just add display: flex; justify-content: center; align-items: center; to the parent container.', 1, 1, 'demo_user'),
('useState is a Hook that lets you add state to functional components. Example: const [count, setCount] = useState(0);', 2, 1, 'demo_user');

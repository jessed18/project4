import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ user, logout }) {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [categoriesRes, questionsRes] = await Promise.all([
                axios.get('/api/categories'),
                axios.get('/api/questions')
            ]);

            setCategories(categoriesRes.data);
            setQuestions(questionsRes.data);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterByCategory = async (categoryId) => {
        setSelectedCategory(categoryId);
        setLoading(true);

        try {
            const url = categoryId
              ? `/api/questions?category_id=${categoryId}`
              :'/api/questions';

            const response = await axios.get(url);
            setQuestions(response.data);
        } catch (error) {
            console.error('Failed to filter:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return <div className = "loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <header classname="dashboard-header">
                <h1>Vexyn</h1>
                <div className="header-right">
                    <span className="username">Welcome, {user.username}!</span>
                    <Link to="/ask" className="btn-ask">Ask Question</Link>
                    <button onClick={logout} className="btn-logout">Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="sidebar">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        <li
                            className={!selectedCategory ? 'active' : ''}
                            onClick={() => filterByCategory(null)}
                        >
                          <span></span> All Questions
                        </li>
                        {categories.map(category => (
                            <li
                                key={category.id}
                                className = {selectedCategory === category.id ? 'active' : ''}
                                onClick = {() => filterByCategory(category.id)}
                            >
                                <span>{category.icon}</span> {category.name}
                            </li>
                        ))}
                     </ul>
                    </aside>

                    <main className="main-content">
                        {questions.length === 0 ? (
                            <div className="empty-state">
                                <h2>No questions yet</h2>
                                <p>Be the first to ask a question!</p>
                                <Link to="/ask" className="btn-primary">Ask a Question</Link>
                            </div>
                        ) : (
                            <div className="questions-list">
                                {questions.map(question => (
                                    <Link
                                       to={`/question/${question.id}`} 
                                       key={question.id} 
                                       className="question-card"
                                    >
                                        <div className="question-header">
                                            <span
                                                className="category-badge"
                                                style={{backgroundColor: question.color}}
                                            >
                                                {question.icon}{question.category_name}
                                            </span>
                                            <span className="question-date">{formatDate(question.created_at)}</span>
                                        </div>

                                        <h3>{question.title}</h3>

                                        <div className="quesetion-footer">
                                            <span className="question-author">by {question.username}</span>
                                            <span className="question-stats">
                                                {question.answer_count} {question.answer_count === 1 ? 'answer' : 'answers'}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </main>
                 </div>
             </div>
           );
        }

        export default Dashboard;
                    


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AskQuestion.css';

function AskQuestion({ user, logout }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
      if (response.data.length > 0) {
        setCategoryId(response.data[0].id);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/questions', {
        title,
        content,
        category_id: categoryId
      }, {
        withCredentials: true
      });

      navigate(`/question/${response.data.questionId}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-question">
      <header className="dashboard-header">
        <h1>Vexyn</h1>
        <div className="header-right">
          <span className="username">Welcome, {user.username}!</span>
          <Link to="/dashboard" className="btn-back">Back to Dashboard</Link>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="ask-content">
        <h2>Ask a Question</h2>
        
        <form onSubmit={handleSubmit} className="ask-form">
          <div className="form-group">
            <label>Category</label>
            <select 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question?"
              required
              minLength="10"
              maxLength="200"
            />
            <small>{title.length}/200 characters</small>
          </div>

          <div className="form-group">
            <label>Details</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide more details about your question..."
              rows="10"
              required
              minLength="20"
            />
            <small>Be specific and provide context</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Question'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
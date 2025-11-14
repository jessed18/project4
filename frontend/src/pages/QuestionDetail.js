import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './QuestionDetail.css';

function QuestionDetail({ user, logout }) {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadQuestion = useCallback(async () => {
    try {
      const response = await axios.get(`/api/questions/${id}`);
      setQuestion(response.data.question);
      setAnswers(response.data.answers);
    } catch (error) {
      console.error('Failed to load question:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadQuestion();
  }, [id, loadQuestion]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    
    if (!newAnswer.trim()) {
      return;
    }

    setSubmitting(true);

    try {
      await axios.post('/api/answers', {
        content: newAnswer,
        question_id: id
      }, {
        withCredentials: true
      });

      loadQuestion();
      setNewAnswer('');
    } catch (error) {
      console.error('Failed to post answer:', error);
      alert('Failed to post answer');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!question) {
    return <div className="error">Question not found</div>;
  }

  return (
    <div className="question-detail">
      <header className="dashboard-header">
        <h1>Vexyn</h1>
        <div className="header-right">
          <span className="username">Welcome, {user.username}!</span>
          <Link to="/dashboard" className="btn-back">Back to Dashboard</Link>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="detail-content">
        <div className="question-section">
          <div className="question-meta">
            <span 
              className="category-badge" 
              style={{ backgroundColor: question.color }}
            >
              {question.icon} {question.category_name}
            </span>
            <span className="date">{formatDate(question.created_at)}</span>
          </div>

          <h2>{question.title}</h2>
          
          <div className="question-content">
            {question.content}
          </div>

          <div className="question-author">
            Asked by <strong>{question.username}</strong>
          </div>
        </div>

        <div className="answers-section">
          <h3>
            {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
          </h3>

          {answers.length === 0 ? (
            <p className="no-answers">No answers yet. Be the first to answer!</p>
          ) : (
            <div className="answers-list">
              {answers.map(answer => (
                <div key={answer.id} className="answer-card">
                  <div className="answer-content">
                    {answer.content}
                  </div>
                  <div className="answer-footer">
                    <span className="answer-author">by {answer.username}</span>
                    <span className="answer-date">{formatDate(answer.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="post-answer-section">
          <h3>Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer here..."
              rows="6"
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Answer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
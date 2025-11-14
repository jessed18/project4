import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import './Auth.css';

function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] =  useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/api/login', {
                username,
                password
            });

            setUser(response.data.user);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className = "auth-container">
            <div className = "auth-box">
                <h1>Vexyn</h1>
                <h2>Login</h2>

                <form onSubmit = {handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className = "form-group">
                        <input
                           type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type = "submit" disabled={loading}>
                        {loading ? 'Loggin in...' : 'Login'}
                    </button>
                 </form>

                 <p className="auth-link">
                     Don't have an account? <Link to="/register">Register here</Link>
                 </p>
                </div>
               </div>
           );
        }

        export default Login;

        


                
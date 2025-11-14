import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import api from './api';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuestionDetail from './pages/QuestionDetail';
import AskQuestion from './pages/AskQuestion';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        checkAuth();
     }, [])

     const checkAuth = async () => {
        try {
            const response = await api.get('/api/check-auth');

            if (response.data.isAuthenticated) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
     };

     const logout = async () => {
        try {
            await api.post('/api/logout', {});
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
     };

     if (loading) {
        return <div className = "loading">Loading....</div>
     }

     return (
        <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
        <Routes>
            <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
            } />
            
            <Route path="/register" element={
            user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />
            } />
            
            <Route path="/dashboard" element={
            user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/login" />
            } />
            
            <Route path="/question/:id" element={
            user ? <QuestionDetail user={user} logout={logout} /> : <Navigate to="/login" />
            } />
            
            <Route path="/ask" element={
            user ? <AskQuestion user={user} logout={logout} /> : <Navigate to="/login" />
            } />
            
            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
        </BrowserRouter>
    );
    }

    export default App;
        
        

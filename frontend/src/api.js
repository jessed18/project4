import axios from 'axios';

// API Configuration
// In development, use relative URLs (proxy handles it)
// In production, use your deployed backend URL

const isDevelopment = process.env.NODE_ENV === 'development';

// Replace this with your actual backend URL when deployed
// Example: 'https://your-backend.herokuapp.com' or 'https://your-backend.railway.app'
const API_BASE_URL = isDevelopment 
  ? '' // Empty string uses relative URLs (proxy in package.json)
  : process.env.REACT_APP_API_URL || 'https://your-backend-url.herokuapp.com';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for session cookies
});

export default api;


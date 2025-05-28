import axios from 'axios';

// Create a configured axios instance for consistent API calls
const api = axios.create({
  baseURL: 'http://localhost:9090',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
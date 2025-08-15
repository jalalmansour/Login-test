import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000/api/auth'; // Replace with your backend API URL

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

const authService = {
  register,
  login,
};

export default authService;
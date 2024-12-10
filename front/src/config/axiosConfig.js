import axios from 'axios';

console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type':'application/json'
    },
});

api.interceptors.response.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
export default api;
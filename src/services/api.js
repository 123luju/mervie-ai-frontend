import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://mervie-ai-backend.onrender.com/api' });
const t = localStorage.getItem('mervie_token');
if(t) api.defaults.headers.common.Authorization = 'Bearer '+t;
export default api;

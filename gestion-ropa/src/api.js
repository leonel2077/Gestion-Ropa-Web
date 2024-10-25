import axios from 'axios';

// Configura la URL base del backend
const api = axios.create({
  baseURL: 'http://localhost:4001/api',  // Asegúrate de usar la URL correcta del backend
});

export default api;

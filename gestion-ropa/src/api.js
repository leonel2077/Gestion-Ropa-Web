import axios from 'axios';

// Configura la URL base del backend
const api = axios.create({
  baseURL: 'http://localhost:4001/api', // Cambia la URL si es necesario
});

// Añade un interceptor para agregar el token JWT en las cabeceras
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtenemos el token del localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Formato 'Bearer <token>'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

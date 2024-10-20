import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Reemplaza con la URL de tu backend

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data; // El backend debería devolver el token y los datos del usuario
};

const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data; // Datos del usuario
};

export default {
  login,
  getProfile,
};

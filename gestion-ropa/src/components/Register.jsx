import React, { useState } from 'react';
import api from '../api'; // Asegúrate de que tienes una instancia de Axios configurada

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);

  // Manejar el cambio en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada a la API del backend para registrar al usuario
      const response = await api.post('/users', formData);
      console.log('User registered:', response.data);

      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Error al registrar el usuario');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Register;

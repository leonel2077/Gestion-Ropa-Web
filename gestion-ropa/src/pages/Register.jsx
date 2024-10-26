import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';  // Aquí haces las llamadas a la API

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Usado para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { name, email, password });
      alert('Registro exitoso');
      navigate('/'); // Redirige al login después de registrarse
    } catch (error) {
      setErrorMessage('Error al registrarse');
    }
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <button className="secondary-button" onClick={() => navigate('/')}>
        Volver al Login
      </button>
    </div>
  );
};

export default Register;

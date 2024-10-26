import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';  // Aquí haces las llamadas a la API

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Usado para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      if (response.data.token) {
        onLogin(response.data.token); // Guarda el token al loguear correctamente
        navigate('/home');  // Redirige a la página Home
      }
    } catch (error) {
      setErrorMessage('Credenciales incorrectas');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <button className="secondary-button" onClick={() => navigate('/register')}>
        ¿No tienes una cuenta? Regístrate
      </button>
    </div>
  );
};

export default Login;

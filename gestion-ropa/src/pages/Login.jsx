import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';  
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      console.log(response.data)
      const { token, role } = response.data;
      if (token) {
        login(token, role); 
        localStorage.setItem('token', token);
        navigate('/inventory');  
      }
    } catch (error) {
      console.error(error);
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

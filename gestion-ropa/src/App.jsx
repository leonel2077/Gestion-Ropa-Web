import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import InventoryManagement from './components/InventoryManagement.jsx';
import SalesPage from './components/SalesPage.jsx';
import SalesManagement from './components/SalesManagement.jsx';
import Register from './pages/Register.jsx';  // Importamos el registro
import Login from './pages/Login.jsx';        // Importamos el login
import Home from './pages/Home';              // Nueva página Home

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controla si el usuario está logueado

  const handleLogin = (token) => {
    // Simula un login guardando un token, aquí podrías usar localStorage o context
    setIsAuthenticated(true);
    localStorage.setItem('token', token); // Aquí guardamos el token en localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Removemos el token en logout
  };

  return (
    <Router>
      <Routes>
        {/* Si no está autenticado, redirige siempre al login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        
        {/* Ruta para registrarse */}
        <Route path="/register" element={<Register />} />
        
        {/* Ruta protegida para la home, solo accesible si estás logueado */}
        <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} />
        
        {/* Si intentas acceder a una ruta inexistente, te redirige al login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

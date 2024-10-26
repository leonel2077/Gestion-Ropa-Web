// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Inventory from './pages/Inventory.jsx';
import SalesPage from './pages/Sales.jsx'; // Nueva página de ventas
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/" />} />
        <Route path="/sales" element={isAuthenticated ? <SalesPage /> : <Navigate to="/" />} /> {/* Nueva ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

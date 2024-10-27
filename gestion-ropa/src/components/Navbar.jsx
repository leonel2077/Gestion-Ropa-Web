// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Gestión Ropa
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/inventory">Inventario</Link>
              <Link to="/sales">Ventas</Link>
              <button onClick={handleLogout} className="logout-button">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

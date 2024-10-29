// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Inventory from './pages/Inventory.jsx';
import SalesPage from './pages/Sales.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import SalesDetails from './pages/SalesDetails.jsx';
import CreateClothesPage from './pages/CreateClothesPage';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]); // Estado para el carrito

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/inventory" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/" />} />
        <Route path="/sales" element={isAuthenticated ? <SalesPage addToCart={addToCart} cart={cart} /> : <Navigate to="/" />}/>
        <Route path="/sales-details" element={isAuthenticated ? <SalesDetails cart={cart} clearCart={clearCart} /> : <Navigate to="/" />}/>
        <Route path="/create-clothes" element={isAuthenticated ? <CreateClothesPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

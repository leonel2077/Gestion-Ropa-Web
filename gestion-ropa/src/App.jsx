import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import AddClothing from './pages/AddClothing';
import Sales from './pages/Sales';
import SaleDetail from './pages/SaleDetail';
import PrivateRoute from './components/PrivateRoute'; // Ruta privada si ya tienes autenticación
import { AuthProvider } from './context/AuthContext'; // Si ya tienes el contexto de autenticación

const App = () => {
  return (
    <Router>
      <AuthProvider> {/* Solo si tienes autenticación global */}
        <Routes>
          {/* Ruta para Login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas para el Inventario */}
          <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} /> {/* Protegida */}

          {/* Ruta para agregar una nueva prenda */}
          <Route path="/add-clothing" element={<PrivateRoute><AddClothing /></PrivateRoute>} /> {/* Protegida */}

          {/* Rutas para las ventas */}
          <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} /> {/* Protegida */}
          <Route path="/sales/:id" element={<PrivateRoute><SaleDetail /></PrivateRoute>} /> {/* Protegida */}

          {/* Otras rutas... */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

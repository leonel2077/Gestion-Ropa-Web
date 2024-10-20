import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulación de login
  const login = async (email, password) => {
    // Usuario y contraseña simulados
    const mockEmail = "gero@gmail";
    const mockPassword = "gero";
    
    if (email === mockEmail && password === mockPassword) {
      const userData = {
        nombre: 'Administrador',
        email: mockEmail,
        rol: 'admin',
      };
      localStorage.setItem('token', 'fake-token'); // Simulando el guardado del token
      setUser(userData);
      navigate('/inventory'); // Redirigir a la página de inventario
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Al iniciar la aplicación, verificar si el token está presente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({
        nombre: 'Administrador',
        email: 'admin@ejemplo.com',
        rol: 'admin',
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

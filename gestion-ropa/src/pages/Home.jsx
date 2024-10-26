import React from 'react';

const Home = ({ onLogout }) => {
  return (
    <div>
      <h1>Bienvenido a la página principal (Home)</h1>
      <button onClick={onLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Home;

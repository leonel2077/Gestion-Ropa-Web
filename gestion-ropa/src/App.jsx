import { useState } from 'react';
import './App.css';
import InventoryManagement from './components/InventoryManagement.jsx';
import SalesPage from './components/SalesPage.jsx';
import SalesManagement from './components/SalesManagement.jsx';
import Register from './components/Register.jsx';

function App() {
  const [isAdmin, setIsAdmin] = useState(true); // Puedes cambiar esto según el rol del usuario
  const [userId, setUserId] = useState(1); // Este valor debe establecerse según el usuario conectado
  const [activeTab, setActiveTab] = useState('inventory'); // Pestaña activa

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'inventory':
        return <InventoryManagement isAdmin={isAdmin} />;
      case 'sales':
        return <SalesPage />;
      case 'salesManagement':
        return <SalesManagement isAdmin={isAdmin} userId={userId} />;
      case 'register':  // Nueva pestaña para el registro
        return <Register />;
      default:
        return null;
    }
  }

  return (
    <>
      <h1>Sistema de Gestión y Ventas de Ropa</h1>
      <div className="container mx-auto p-4">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'inventory' ? 'active' : ''}`} 
            onClick={() => setActiveTab('inventory')}
          >
            Inventario
          </button>
          <button 
            className={`tab ${activeTab === 'sales' ? 'active' : ''}`} 
            onClick={() => setActiveTab('sales')}
          >
            Ventas
          </button>
          <button 
            className={`tab ${activeTab === 'salesManagement' ? 'active' : ''}`} 
            onClick={() => setActiveTab('salesManagement')}
          >
            Gestión de Ventas
          </button>
          <button 
            className={`tab ${activeTab === 'register' ? 'active' : ''}`} 
            onClick={() => setActiveTab('register')}
          >
            Registro
          </button>
        </div>
        <div className="tab-content">
          {renderActiveTab()}
        </div>
      </div>
    </>
  );
}

export default App;

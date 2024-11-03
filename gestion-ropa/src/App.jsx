import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from './context/UserContext';
import Cart from './pages/Cart.jsx';
import CreateClothesPage from './pages/CreateClothesPage';
import CompletedSalesPage from './pages/CompletedSalesPage';
import EditClothesPage from './pages/EditClothesPage';
import Inventory from './pages/Inventory.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import SaleDetail from './pages/SaleDetail';
import SellClothes from './pages/SellClothes.jsx';

import Navbar from './components/Navbar';

function App() {
  const [cart, setCart] = useState([]); 
  const { user, logout } = useContext(UserContext);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
      <Router>
        <Navbar isAuthenticated={!!user} onLogout={logout} />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/inventory" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inventory" element={user ? <Inventory userRole={user.role} /> : <Navigate to="/" />} />
          <Route path="/sell" element={user ? <SellClothes addToCart={addToCart} cart={cart} /> : <Navigate to="/" />}/>
          <Route path="/cart" element={user ? <Cart cart={cart} clearCart={clearCart} /> : <Navigate to="/" />}/>
          <Route path="/clothes/edit/:id" element={user ? <EditClothesPage /> : <Navigate to="/" />} />
          <Route path="/sale-detail/:saleId" element={user ? <SaleDetail /> : <Navigate to="/" />} />
          <Route path="/create-clothes" element={user ? <CreateClothesPage /> : <Navigate to="/" />} />
          <Route path="/completed-sales" element={user ? <CompletedSalesPage /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  );
}

export default App;

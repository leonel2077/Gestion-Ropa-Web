// src/pages/SalesDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SalesDetails.css';

const SalesDetails = ({ cart, clearCart }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  }, [cart]);

  const handleConfirmPurchase = async () => {
    try {
      await axios.post('http://localhost:4001/api/sales', { items: cart });
      alert('Compra confirmada');
      clearCart();
      navigate('/sales');
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      alert('Hubo un problema al confirmar la compra');
    }
  };

  return (
    <div className="sales-details-container">
      <h1>Detalles de la Compra</h1>
      {cart.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.name}</span>
                <span>Cantidad: {item.quantity}</span>
                <span>Precio: ${item.price}</span>
              </li>
            ))}
          </ul>
          <h2>Total: ${total}</h2>
          <button onClick={handleConfirmPurchase}>Confirmar Compra</button>
        </>
      )}
    </div>
  );
};

export default SalesDetails;

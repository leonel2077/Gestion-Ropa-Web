import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './cart.css';

const Cart = ({ cart, clearCart }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Calcula el monto total de la compra en el frontend
    const totalAmount = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    setTotal(totalAmount);
  }, [cart]);

  const handleConfirmPurchase = async () => {
    try {

      // Crear `saleDetails` a partir del carrito de compras
      const saleDetails = cart.map((item) => ({
        clothesId: item.id,
        quantity: item.quantity || 1,
        price: item.price,
      }));
  
      // Calcular el monto total de la venta
      const totalAmount = saleDetails.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
      // Log para ver los datos antes de enviarlos
      console.log("Total Amount:", totalAmount);
      console.log("Sale Details:", saleDetails);
  
      // Realizar la solicitud al backend
      await api.post(
        '/sales',
        { totalAmount, saleDetails },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      alert('Compra confirmada');
      clearCart(); 
      navigate('/completed-sales'); 
  
    } catch (error) {
      // Bloque de manejo de errores detallado
      if (error.response) {
        console.error('Error al confirmar la compra:', error.response.data); // Mostrar mensaje específico del backend
        alert(`Hubo un problema al confirmar la compra: ${error.response.data.error || 'Error desconocido'}`);
      } else {
        console.error('Error al confirmar la compra:', error.message);
        alert('Hubo un problema al confirmar la compra');
      }
    }
  };


  return (
    <div className="sales-details-container">
      <h1>Carrito</h1>
      {cart.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.name}</span>
                <span>Cantidad: {item.quantity || 1}</span>
                <span>Precio: ${item.price}</span>
              </li>
            ))}
          </ul>
          <h2>Total: ${total}</h2>
          <button onClick={handleConfirmPurchase}>Confirmar Venta</button>
        </>
      )}
    </div>
  );
};

export default Cart;

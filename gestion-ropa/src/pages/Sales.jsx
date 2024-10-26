// src/pages/Sales.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sales.css';

const Sales = () => {
  const [cart, setCart] = useState([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState([]); // Estado para almacenar los productos

  // Función para obtener productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/clothes');
        setProducts(response.data); // Asume que la API devuelve un array de objetos de prendas
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="sales-container">
      <h1>Sistema de Ventas</h1>
      <div className="sales-header">
        <button className="cart-button">
          🛒 Ver Carrito ({cart.length})
        </button>
        <button className="admin-button" onClick={() => setIsAdminMode(!isAdminMode)}>
          Modo {isAdminMode ? 'Usuario' : 'Admin'}
        </button>
      </div>

      <div className="catalog">
        <h2>Catálogo de Productos</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="product-row">
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td><input type="number" defaultValue="1" min="1" max={product.stock} /></td>
                <td>
                  <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;

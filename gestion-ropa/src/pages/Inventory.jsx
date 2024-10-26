// src/pages/Inventory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';


const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/clothes');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <h1>Inventario de Prendas</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar prenda..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
              <p>Cantidad: {product.quantity}</p>
              {/* Puedes agregar más detalles aquí */}
            </div>
          ))
        ) : (
          <p>No se encontraron productos que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;

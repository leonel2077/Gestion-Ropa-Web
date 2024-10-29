import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/clothes');
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
      <h1>Inventario de Ropa</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar prenda..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

        <button className="new-product-button" onClick={() => navigate('/create-clothes')}>
          Agregar Prenda
        </button>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <span className="color-badge" style={{ backgroundColor: product.color }}>{product.color}</span>
                </td>
                <td>${product.price}</td>
                <td>
                  <span className={`stock-badge ${product.stock <= 20 ? 'low-stock' : ''}`}>
                    {product.stock}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron productos que coincidan con la búsqueda.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;

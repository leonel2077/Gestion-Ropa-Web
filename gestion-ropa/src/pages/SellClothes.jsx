import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sellClothes.css';

const SellClothes = ({ addToCart, cart }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [quantities, setQuantities] = useState({}); // Estado para almacenar las cantidades de cada producto
  const navigate = useNavigate();

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

  // Maneja el cambio en la cantidad de cada producto
  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  // Función para agregar al carrito con la cantidad seleccionada
  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1; // Usa la cantidad seleccionada o 1 por defecto
    addToCart({ ...product, quantity });
  };

  return (
    <div className="sales-container">
      <h1>Sistema de Ventas</h1>
      <div className="sales-header">
        <button className="cart-button" onClick={() => navigate('/cart')}>
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
                <td>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantities[product.id] || 1} // Usa el valor almacenado o 1 por defecto
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                  />
                </td>
                <td>
                  <button onClick={() => handleAddToCart(product)}>Agregar al Carrito</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellClothes;

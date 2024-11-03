import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './inventory.css';
import { UserContext } from '../context/UserContext';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("Usuario:", user)
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

  const handleDelete = async (id) => {
    try {
        await api.delete(`/clothes/${id}`);
        setProducts(products.filter((item) => item.id !== id)); 
    } catch (error) {
        console.error("Error deleting clothes:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/clothes/edit/${id}`);
  };

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

      {user && user.role === 'admin' && (
        <button className="new-product-button" onClick={() => navigate('/create-clothes')}>
          Agregar Prenda
        </button>
      )};

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
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
                <td>
                  {user?.role === 'admin' && (
                    <>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(product.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
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

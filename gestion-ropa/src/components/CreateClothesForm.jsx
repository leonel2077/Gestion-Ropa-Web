import { useState, useEffect } from 'react'
import api from '../api';
import './CreateClothesStyles.css';

const CreateClothes = () => {
    const [brands, setBrands] = useState([]);
    const [garmentTypes, setGarmentTypes] = useState([]);
    const [formData, setFormData] = useState ({
        name: '',
        color: '',
        price: '',
        stock: '',
        size: '',
        brandId: '',
        garmentTypeId: ''
    });

    useEffect(() => {
        const fetchBrands = async () => {
          try {
            const response = await api.get('/brands');
            setBrands(response.data);
          } catch (error) {
            console.error("Error fetching brands:", error);
          }
        };
    
        const fetchGarmentTypes = async () => {
          try {
            const response = await api.get('/garment-types');
            setGarmentTypes(response.data);
          } catch (error) {
            console.error("Error fetching garment types:", error);
          }
        };
    
        fetchBrands();
        fetchGarmentTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data being sent:", formData);
        try {
            await api.post('/clothes', formData);
            alert('Producto creado exitosamente!');
        } catch (error) {
            console.error('Error creando el producto:', error);
            alert('Hubo un problema creando el producto');
        }
    };

    return (
      <div className="create-clothes-container">
        <h1>Agregar Prenda</h1>
        <form className="create-clothes-form" onSubmit={handleSubmit}>
      
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Modelo de la prenda" required />
          <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" required />
      
          <div className="form-row">
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Precio" required />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
          </div>
      
          <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Talle" required />
      
          <div className="form-row">
            <select name="brandId" value={formData.brandId} onChange={handleChange} required>
              <option value="">Selecciona la marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
      
            <select name="garmentTypeId" value={formData.garmentTypeId} onChange={handleChange} required>
              <option value="">Selecciona el tipo</option>
              {garmentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
      
          <button type="submit">Agregar prenda</button>
          </form>
      </div>
    )
};

export default CreateClothes;
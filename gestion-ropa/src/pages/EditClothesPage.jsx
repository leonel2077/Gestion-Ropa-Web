import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../components/createClothesStyles.css';

const EditClothesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [garmentTypes, setGarmentTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        price: '',
        stock: '',
        size: '',
        brandId: '',
        garmentTypeId: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clothesResponse = await api.get(`/clothes/${id}`);
                setFormData(clothesResponse.data);

                const brandsResponse = await api.get('/brands');
                setBrands(brandsResponse.data);

                const garmentTypesResponse = await api.get('/garment-types');
                setGarmentTypes(garmentTypesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/clothes/${id}`, formData);
            navigate('/inventory'); 
        } catch (error) {
            console.error("Error updating clothes:", error);
        }
    };

    return (
        <div className="create-clothes-container">
            <h1>Editar Prenda</h1>
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

                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditClothesPage;

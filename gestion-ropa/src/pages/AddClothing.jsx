import React, { useState } from 'react';
import { addClothes } from '../services/clothesService'; // Función simulada de agregar prendas

const AddClothing = () => {
  const [nombre, setNombre] = useState('');
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClothing = {
      nombre,
      talla,
      color,
      precio: parseFloat(precio),
      stock: parseInt(stock)
    };
    await addClothes(newClothing);
    // Limpia el formulario
    setNombre('');
    setTalla('');
    setColor('');
    setPrecio('');
    setStock('');
  };

  return (
    <div>
      <h1>Agregar Nueva Prenda</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Talla:</label>
          <input
            type="text"
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Prenda</button>
      </form>
    </div>
  );
};

export default AddClothing;

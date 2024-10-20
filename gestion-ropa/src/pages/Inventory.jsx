import React, { useEffect, useState } from 'react';
import { getClothes } from '../services/clothesService'; // Función simulada de obtener prendas

const Inventory = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    // Simular la obtención del inventario
    getClothes().then(data => {
      setClothes(data);
    });
  }, []);

  return (
    <div>
      <h1>Inventario de Prendas</h1>
      <ul>
        {clothes.map(item => (
          <li key={item.id}>
            {item.nombre} - Talla: {item.talla} - Color: {item.color} - Precio: ${item.precio.toFixed(2)} - Stock: {item.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;

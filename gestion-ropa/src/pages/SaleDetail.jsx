import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el id de la venta de la URL
import { mockSales } from '../api/mockData'; // Simulación de datos de ventas

const SaleDetail = () => {
  const { id } = useParams(); // Obtener el id de la venta
  const [sale, setSale] = useState(null);

  useEffect(() => {
    // Simular la obtención de los detalles de una venta específica
    const saleData = mockSales.find(sale => sale.id === parseInt(id));
    setSale(saleData);
  }, [id]);

  if (!sale) {
    return <p>Cargando los detalles de la venta...</p>;
  }

  return (
    <div>
      <h1>Detalles de la Venta #{sale.id}</h1>
      <p>Fecha: {sale.fecha}</p>
      <p>Total: ${sale.total.toFixed(2)}</p>
      <h2>Productos Vendidos:</h2>
      <ul>
        {sale.detalles.map((detalle, index) => (
          <li key={index}>
            Prenda ID: {detalle.id_prenda}, Cantidad: {detalle.cantidad}, Precio Unitario: ${detalle.precio_unitario}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaleDetail;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockSales } from '../api/mockData'; // Simulación de datos de ventas

const Sales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Simular la obtención de todas las ventas
    setSales(mockSales);
  }, []);

  return (
    <div>
      <h1>Historial de Ventas</h1>
      <ul>
        {sales.map(sale => (
          <li key={sale.id}>
            <Link to={`/sales/${sale.id}`}>Venta #{sale.id}</Link> - Total: ${sale.total.toFixed(2)} - Fecha: {sale.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sales;

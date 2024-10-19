import React, { useState, useEffect } from 'react'

// Simulated API calls
const fetchSales = async (isAdmin, userId) => {
  // Replace with actual API call
  const allSales = [
    { id: 1, date: '2023-06-01', total: 100, items: [{ name: 'Camiseta', quantity: 2, price: 20 }], sellerId: 1 },
    { id: 2, date: '2023-06-02', total: 150, items: [{ name: 'Pantalón', quantity: 1, price: 50 }], sellerId: 2 },
  ]
  return isAdmin ? allSales : allSales.filter(sale => sale.sellerId === userId)
}

export default function SalesManagement({ isAdmin = false, userId = 1 }) {
  const [sales, setSales] = useState([])
  const [selectedSale, setSelectedSale] = useState(null)

  useEffect(() => {
    fetchSales(isAdmin, userId).then(setSales)
  }, [isAdmin, userId])

  const handleViewDetails = (sale) => {
    setSelectedSale(sale)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Ventas</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="py-2 px-4 border-b">{sale.id}</td>
              <td className="py-2 px-4 border-b">{sale.date}</td>
              <td className="py-2 px-4 border-b">${sale.total}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleViewDetails(sale)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSale && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Detalles de la Venta</h2>
          <p>ID: {selectedSale.id}</p>
          <p>Fecha: {selectedSale.date}</p>
          <p>Total: ${selectedSale.total}</p>
          <h3 className="font-bold mt-2">Items:</h3>
          <ul>
            {selectedSale.items.map((item, index) => (
              <li key={index}>
                {item.name} - Cantidad: {item.quantity}, Precio: ${item.price}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => setSelectedSale(null)}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Detalles
          </button>
        </div>
      )}
    </div>
  )
}
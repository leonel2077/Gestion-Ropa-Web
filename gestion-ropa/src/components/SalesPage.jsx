import React, { useState, useEffect } from 'react'

// Simulated API calls
const fetchClothes = async () => {
  // Replace with actual API call
  return [
    { id: 1, name: 'Camiseta', price: 20, stock: 100 },
    { id: 2, name: 'Pantalón', price: 50, stock: 50 },
  ]
}

const makeSale = async (sale) => {
  // Replace with actual API call
  console.log('Making sale:', sale)
}

export default function SalesPage() {
  const [clothes, setClothes] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    fetchClothes().then(setClothes)
  }, [])

  const handleAddItem = (clothId, quantity) => {
    const cloth = clothes.find(c => c.id === clothId)
    if (cloth && quantity > 0 && quantity <= cloth.stock) {
      setSelectedItems([...selectedItems, { ...cloth, quantity: parseInt(quantity) }])
    }
  }

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index))
  }

  const handleSale = async () => {
    await makeSale(selectedItems)
    setSelectedItems([])
    setClothes(await fetchClothes())
  }

  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Ventas</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Inventario Disponible</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Precio</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Acción</th>
              </tr>
            </thead>
            <tbody>
              {clothes.map((cloth) => (
                <tr key={cloth.id}>
                  <td className="py-2 px-4 border-b">{cloth.name}</td>
                  <td className="py-2 px-4 border-b">${cloth.price}</td>
                  <td className="py-2 px-4 border-b">{cloth.stock}</td>
                  <td className="py-2 px-4 border-b">
                    <select 
                      onChange={(e) => handleAddItem(cloth.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Cantidad</option>
                      {[...Array(cloth.stock)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Carrito de Compras</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Precio</th>
                <th className="py-2 px-4 border-b">Cantidad</th>
                <th className="py-2 px-4 border-b">Subtotal</th>
                <th className="py-2 px-4 border-b">Acción</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">${item.price}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">${item.price * item.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    <button 
                      onClick={() => handleRemoveItem(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <p className="text-xl font-semibold">Total: ${total}</p>
            <button 
              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSale} 
              disabled={selectedItems.length === 0}
            >
              Realizar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useState, useEffect } from 'react'

// Simulated API calls
const fetchClothes = async () => {
  // Replace with actual API call
  return [
    { id: 1, name: 'Camiseta', price: 20, stock: 100 },
    { id: 2, name: 'Pantalón', price: 50, stock: 50 },
  ]
}

const addCloth = async (cloth) => {
  // Replace with actual API call
  console.log('Adding cloth:', cloth)
}

const editCloth = async (cloth) => {
  // Replace with actual API call
  console.log('Editing cloth:', cloth)
}

const deleteCloth = async (id) => {
  // Replace with actual API call
  console.log('Deleting cloth:', id)
}

export default function InventoryManagement({ isAdmin = true }) {
  const [clothes, setClothes] = useState([])
  const [selectedCloth, setSelectedCloth] = useState(null)
  const [isAddingCloth, setIsAddingCloth] = useState(false)

  useEffect(() => {
    fetchClothes().then(setClothes)
  }, [])

  const handleAdd = async (cloth) => {
    await addCloth(cloth)
    setClothes(await fetchClothes())
    setIsAddingCloth(false)
  }

  const handleEdit = async (cloth) => {
    await editCloth(cloth)
    setClothes(await fetchClothes())
    setSelectedCloth(null)
  }

  const handleDelete = async (id) => {
    await deleteCloth(id)
    setClothes(await fetchClothes())
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Inventario</h1>
      {isAdmin && (
        <button 
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsAddingCloth(true)}
        >
          Agregar Prenda
        </button>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Stock</th>
            {isAdmin && <th className="py-2 px-4 border-b">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {clothes.map((cloth) => (
            <tr key={cloth.id}>
              <td className="py-2 px-4 border-b">{cloth.name}</td>
              <td className="py-2 px-4 border-b">${cloth.price}</td>
              <td className="py-2 px-4 border-b">{cloth.stock}</td>
              {isAdmin && (
                <td className="py-2 px-4 border-b">
                  <button 
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => setSelectedCloth(cloth)}
                  >
                    Editar
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(cloth.id)}
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isAddingCloth && (
        <ClothForm onSubmit={handleAdd} onCancel={() => setIsAddingCloth(false)} />
      )}

      {selectedCloth && (
        <ClothForm cloth={selectedCloth} onSubmit={handleEdit} onCancel={() => setSelectedCloth(null)} />
      )}
    </div>
  )
}

function ClothForm({ cloth, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(cloth || { name: '', price: '', stock: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">{cloth ? 'Editar Prenda' : 'Agregar Nueva Prenda'}</h2>
      <div className="mb-2">
        <label htmlFor="name" className="block">Nombre:</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre de la prenda"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="price" className="block">Precio:</label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="stock" className="block">Stock:</label>
        <input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="flex justify-end">
        <button 
          type="button" 
          onClick={onCancel}
          className="mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  )
}
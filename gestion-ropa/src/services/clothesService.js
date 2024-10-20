import { mockInventory } from '../api/mockData';

// Simular obtener el inventario
export const getClothes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInventory);
    }, 500); // Simular un retraso de 500ms
  });
};

// Simular agregar una prenda
export const addClothes = async (newClothing) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockInventory.push(newClothing);
      resolve(newClothing);
    }, 500);
  });
};

// Simular editar una prenda
export const updateClothes = async (id, updatedClothing) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockInventory.findIndex((item) => item.id === id);
      if (index !== -1) {
        mockInventory[index] = updatedClothing;
        resolve(updatedClothing);
      }
    }, 500);
  });
};

// Simular eliminar una prenda
export const deleteClothes = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockInventory.findIndex((item) => item.id === id);
      if (index !== -1) {
        mockInventory.splice(index, 1);
        resolve(true);
      }
    }, 500);
  });
};

export const mockInventory = [
    {
      id: 1,
      nombre: 'Camiseta',
      talla: 'M',
      color: 'Rojo',
      precio: 19.99,
      stock: 10,
    },
    {
      id: 2,
      nombre: 'Pantalón',
      talla: 'L',
      color: 'Azul',
      precio: 39.99,
      stock: 5,
    },
    // Agrega más prendas según sea necesario
  ];
  
  export const mockSales = [
    {
      id: 1,
      fecha: '2024-10-10',
      id_usuario: 1,
      total: 59.98,
      detalles: [
        { id_prenda: 1, cantidad: 2, precio_unitario: 19.99 },
      ],
    },
    // Agrega más ventas simuladas
  ];
  
# Sistema de Gestión de Inventario y Ventas de Ropa

Este proyecto es una aplicación web para la gestión de inventario y ventas de ropa. Permite a los usuarios administrar productos, gestionar ventas, y realizar un seguimiento del inventario disponible.

## Tecnologías

- **Backend**: Node.js, Express.js, Sequelize, MySQL
- **Frontend**: React, Vite
- **Autenticación**: JWT (JSON Web Token)
- **Estilos**: CSS

## Funcionalidades

- **Gestión de Inventario**: Añadir, editar, y eliminar prendas de ropa con atributos como nombre, marca, tipo de prenda, color, talla, precio y stock.
- **Gestión de Ventas**: Registrar ventas de productos, donde los vendedores pueden ver solo sus ventas y los administradores pueden ver todas las ventas.
- **Autenticación y Roles**: Implementación de autenticación con JWT y verificación de roles (vendedor y administrador) para restringir el acceso a ciertas secciones.
- **Carrito de Compras**: Permite a los usuarios (vendedores o administradores) añadir productos al carrito y visualizar el detalle de la venta.

## Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone git@github.com:leonel2077/Gestion-Ropa-Web.git
   ```
2. Accede al directorio del proyecto:
  ```bash
   cd Gestion-Ropa-Web
   ```
3. Inicia el servidor del backend (revisar el otro repositorio para su configuración):
   ```bash
   npm start
   ```
4. En otra terminal, instala las dependencias del frontend:
  ```bash
   npm install
   ```
5. Inicia el servidor del frontend:
   ```bash
   npm run dev
   ```

## Autores

- [Mariano Leonel Ison](https://github.com/leonel2077)
- [Geronimo Torres Ortiz](https://github.com/geronimotorresortiz)
- [Lautaro Piacenza](https://github.com/lautaropiacenza)
- [Mateo Roble](https://github.com/MateoRoble)

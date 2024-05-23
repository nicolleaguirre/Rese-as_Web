const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

  const Producto = sequelize.define('Productos', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoria: {
      type: DataTypes.ENUM,
      values: ['Película', 'Serie', 'Restaurante', 'Producto', 'Servicio'],
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

module.exports = Producto;


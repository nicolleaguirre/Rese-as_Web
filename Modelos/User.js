const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

// Define el modelo Usuario
const Usuario = sequelize.define('Pruebas', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Usuario;
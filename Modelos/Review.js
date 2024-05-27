const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Producto = require('./Producto');
const User = require('./User');

const Review = sequelize.define('Reviews', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  reportes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

Review.associate = (models) => {
  Review.belongsTo(models.Producto, { foreignKey: 'productoID', as: 'Producto' });
  Review.belongsTo(models.User, { foreignKey: 'usuarioID', as: 'User' });
};

module.exports = Review;
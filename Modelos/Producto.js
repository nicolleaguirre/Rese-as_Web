const CategoriasEnum = require('./Categorias');

module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoria: {
      type: DataTypes.ENUM,
      values: CategoriasEnum,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return Producto;
};


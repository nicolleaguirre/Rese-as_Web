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
      values: ['Aparatos Electrónicos', 'Ropa', 'Libros', 'Películas', 'Series', 'Restaurantes', 'Videojuegos', 'Lugares Turísticos'],
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return Producto;
};

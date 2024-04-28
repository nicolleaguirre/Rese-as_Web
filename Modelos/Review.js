module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
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
    }
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Producto, { foreignKey: 'productoId', as: 'product' });
    Review.belongsTo(models.User, { foreignKey: 'usuarioId', as: 'user' });
  };

  return Review;
};

module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.User, { foreignKey: 'usuarioId', as: 'usuario' });
    Comentario.belongsTo(models.Review, { foreignKey: 'reseñaId', as: 'reseña' });
  };

  return Comentario;
};


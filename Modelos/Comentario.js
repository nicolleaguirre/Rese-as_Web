const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

  const Comentario = sequelize.define('Comentarios', {
    contenido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
  });

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.User, { foreignKey: 'usuarioID', as: 'User' });
    Comentario.belongsTo(models.Review, { foreignKey: 'reseñaID', as: 'Review' });
  };

module.exports = Comentario;
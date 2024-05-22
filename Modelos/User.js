const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');

  const User = sequelize.define('Users', {
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
      allowNull: false
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  User.addHook('beforeCreate', async (user, options) => {
    const salt = await bcrypt.genSalt();
    console.log(`Salt: ${salt}`); // Imprime el salt generado

    user.password = await bcrypt.hash(user.password, salt);
    console.log(`Password encriptada: ${user.password}`); // Imprime la contraseña encriptada

    // También puedes imprimir el objeto de usuario completo para verificar todos los campos
    console.log(`Usuario: ${JSON.stringify(user, null, 2)}`);
  });

module.exports = User;
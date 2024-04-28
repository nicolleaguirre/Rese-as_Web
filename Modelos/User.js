module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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

  return User;
};

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ReseñasPrueba', 'postgres', 'tang', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
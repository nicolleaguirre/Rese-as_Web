const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ReviewsDB', 'postgres', 'tang', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
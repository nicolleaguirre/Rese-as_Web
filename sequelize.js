const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reviewsdb', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
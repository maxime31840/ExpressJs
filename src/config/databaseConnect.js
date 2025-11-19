const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gmt', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;

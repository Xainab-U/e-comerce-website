const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', '#2003Vaishu', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');
const config = require('../config/config')

const environment = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[environment]);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;

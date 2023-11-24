import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const environment = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[environment]);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectToDatabase };

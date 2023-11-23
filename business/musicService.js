const sequelize = require('../config/db');
const musicModel = require('../models/musicModel');

async function getAllMusic() {
  try {
    await sequelize.authenticate();
    await musicModel(sequelize).sync()

    const music = await musicModel(sequelize).findAll();
    return music;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAllMusic,
};

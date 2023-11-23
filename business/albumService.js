const albumModel = require('../models/albumModel');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

async function getAllAlbums() {
  try {
     await sequelize.authenticate();
     await albumModel(sequelize).sync()

     const albums = await albumModel(sequelize).findAll()
    return albums;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAllAlbums,
};

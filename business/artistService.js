
const artistModel = require('../models/artistModel');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');


async function getAllArtists() {
  try {
    await sequelize.authenticate();
    await artistModel(sequelize).sync();

    const artists = await artistModel(sequelize).findAll();

    return artists;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAllArtists,
};

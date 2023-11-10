const artistModel = require('../models/artistModel');

async function getAllArtists() {
  try {
    const artists = await artistModel.getAllArtistsFromDatabase();
    return artists;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAllArtists,
};

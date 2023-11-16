const albumModel = require('../models/albumModel');

async function getAllAlbums() {
  try {
    const albums = await albumModel.getAllAlbumsFromDatabase();
    return albums;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAllAlbums,
};

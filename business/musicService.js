const musicModel = require('../models/musicModel');

async function getAllMusic() {
  try {
    const music = await musicModel.getAllMusicFromDatabase();
    return music;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAllMusic,
};

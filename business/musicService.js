import {sequelize, connectToDatabase} from '../config/db.js';
import musicModel from '../models/musicModel.js';

async function getAllMusic() {
  try {
    await connectToDatabase()
    await musicModel(sequelize).sync();

    const music = await musicModel(sequelize).findAll();
    return music;
  } catch (error) {
    throw error;
  }
}

export default {
  getAllMusic,
};

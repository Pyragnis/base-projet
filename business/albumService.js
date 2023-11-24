import albumModel from '../models/albumModel.js';
import { Sequelize } from 'sequelize';
import {sequelize, connectToDatabase} from '../config/db.js';

async function getAllAlbums() {
  try {
    await connectToDatabase()
    await albumModel(sequelize).sync();

    const albums = await albumModel(sequelize).findAll();
    return albums;
  } catch (error) {
    throw error;
  }
}

export const albumBusinesses =  {
  getAllAlbums,
};

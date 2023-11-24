import artistModel from '../models/artistModel.js';
import { Sequelize } from 'sequelize';
import {sequelize, connectToDatabase} from '../config/db.js';

async function getAllArtists() {
  try {
    await connectToDatabase();
    await artistModel(sequelize).sync();

    const artists = await artistModel(sequelize).findAll();

    return artists;
  } catch (error) {
    throw error;
  }
}

export const  artistBusinesses =  {
  getAllArtists,
};

import { Artist } from "../models/models.js";
import { sequelize, connectToDatabase } from "../config/db.js";

async function getAllArtists() {
  try {
    await connectToDatabase();
    await Artist.sync();

    const artists = await Artist.findAll();

    return artists;
  } catch (error) {
    throw error;
  }
}


async function getArtistById(id) {
  try {
    const artist = await Artist.findByPk(id);
    return artist;
  } catch (error) {
    throw error;
  }
}

async function addArtist(artistdata) {
  try {
    await connectToDatabase();

    const addArtist = await Artist.create(artistdata);

    return addArtist;
  } catch (error) {
    throw error;
  }
}


async function addMultipleArtists(artistsData) {
  try {
    const addedArtists = await Artist.bulkCreate(artistsData);
    return addedArtists;
  } catch (error) {
    throw error;
  }
}

async function deleteArtist(artistid) {
  try {
    await connectToDatabase();
    await Artist.sync();

    const deleteArtist = await Artist.destroy({
      where: { artist_id: artistid },
    });
    console.log(deleteArtist, "here is my delete");
    return deleteArtist;
  } catch (error) {
    throw error;
  }
}

async function updateArtistdata(artistdata) {
  try {
    await connectToDatabase();
    await Artist.sync();

    const artistId = artistdata.artist_id;

    // Check if the artist with the given ID exists
    const existingArtist = await Artist.findByPk(artistId);

    if (!existingArtist) {
      throw new Error(`Artist with ID ${artistId} not found.`);
    }

    // Update the existing artist's data
    await Artist.update(artistdata, {
      where: { artist_id: artistId },
    });

    // Fetch and return the updated artist
    const updatedArtist = await Artist.findByPk(artistId);
    return updatedArtist;
  } catch (error) {
    throw error;
  }
}

export default {
  getAllArtists,
  addArtist,
  updateArtistdata,
  deleteArtist,
  addMultipleArtists,
  getArtistById
};

import { Album, Artist, Music, CoverImage } from "../models/models.js";
import { Sequelize } from "sequelize";
import { sequelize, connectToDatabase } from "../config/db.js";
import s3 from "../aws-config/s3.js"; // Make sure to import s3

async function getAllAlbums() {
  try {
    await connectToDatabase();
    await Album.sync();

    const albums = await Album.findAll({
      include: [
        {
          model: Music,
          as: "Music",
        },
      ],
    });

    const albumsWithUrls = await Promise.all(
      albums.map(async (album) => {
        const musicList = await Promise.all(
          album.Music.map(async (music) => {
            // Fetch CoverImage for the Music
            const coverImage = await CoverImage.findOne({
              where: { music_id: music.music_id },
            });

            // Fetch URL for the CoverImage of the Music
            const coverImageUrl = coverImage
              ? await s3.getFile(coverImage.dataValues.url)
              : null;

            // Fetch URL for the Album cover image
            const albumCoverImageUrl = album.cover_id
              ? await s3.getFile(album.dataValues.url) // Replace "url" with the actual column name for the cover image URL in Album
              : null;

            // Fetch URL for the Music file_path
            const musicUrl = await s3.getFile(music.dataValues.file_path);

            // Return Music data with URLs
            return {
              ...music.dataValues,
              coverImageUrl,
              albumCoverImageUrl,
              musicUrl,
            };
          })
        );

        // Return Album data with Music list containing URLs
        return { ...album.dataValues, Music: musicList };
      })
    );

    return albumsWithUrls;
  } catch (error) {
    console.error("Error in getAllAlbums:", error);
    throw error;
  }
}


async function addAlbum(data) {
  try {
    await connectToDatabase();
    await Album.sync();

    const addedResponse = await Album.create(data);
    return addedResponse;
  } catch (error) {
    throw error;
  }
}

async function getAlbumById(album_id) {
  try {
    await connectToDatabase();
    await Music.sync();
    await CoverImage.sync();
    await Artist.sync();
    await Album.sync();

    const album = await Album.findOne({
      where: { album_id: album_id },
      include: [
        {
          model: Artist,
          as: "Artist",
        },
      ],
    });

    if (!album) {
      throw new Error(`Album with id ${album_id} not found.`);
    }

    const url = await s3.getFile(album.dataValues.file_path);

    return { album, url };
  } catch (error) {
    console.error("Error in getAlbumById:", error);
    throw error;
  }
}

async function updateAlbum(data) {
  try {
    await connectToDatabase();
    await Album.sync();

    const updatedResponse = await Album.update(data, {
      where: { album_id: data.album_id },
    });

    return updatedResponse;
  } catch (error) {
    throw error;
  }
}

async function deleteAlbum(album_id) {
  try {
    await connectToDatabase();
    await Album.sync();

    const deletedResponse = await Album.destroy({
      where: { album_id: album_id },
    });

    return deletedResponse;
  } catch (error) {
    throw error;
  }
}

export default {
  getAllAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumById,
};

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
        const albumCoverImage = await CoverImage.findOne({
          where: { album_id: album.album_id },
        });

        const albumCoverImageUrl = albumCoverImage
          ? await s3.getFile(albumCoverImage.dataValues.url)
          : null;

        const musicList = await Promise.all(
          album.Music.map(async (music) => {
            const coverImage = await CoverImage.findOne({
              where: { music_id: music.music_id },
            });

            const coverImageUrl = coverImage
              ? await s3.getFile(coverImage.dataValues.url)
              : null;

            const musicUrl = await s3.getFile(music.dataValues.file_path);

            return {
              ...music.dataValues,
              coverImageUrl,
              musicUrl,
            };
          })
        );
        return { ...album.dataValues, Music: musicList, albumCoverImageUrl };
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
    await Album.sync();

    const album = await Album.findOne({
      where: { album_id: album_id },
      include: [
        {
          model: Music,
          as: "Music",
        },
      ],
    });

    if (!album) {
      throw new Error(`Album with id ${album_id} not found.`);
    }

    const albumCoverImage = await CoverImage.findOne({
      where: { album_id: album_id },
    });

    const albumCoverImageUrl = albumCoverImage
      ? await s3.getFile(albumCoverImage.dataValues.url)
      : null;

    const musicList = await Promise.all(
      album.Music.map(async (music) => {
        const coverImage = await CoverImage.findOne({
          where: { music_id: music.music_id },
        });

        const coverImageUrl = coverImage
          ? await s3.getFile(coverImage.dataValues.url)
          : null;

        const musicUrl = await s3.getFile(music.dataValues.file_path);
        return {
          ...music.dataValues,
          coverImageUrl,
          musicUrl,
        };
      })
    );

    return { ...album.dataValues, Music: musicList, albumCoverImageUrl };
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

    const deletedAlbum = await Album.findByPk(album_id);

    if (!deletedAlbum) {
      throw new Error(`Album with id ${album_id} not found.`);
    }

    await Music.destroy({
      where: { album_id: album_id },
    });

    const deletedResponse = await deletedAlbum.destroy();

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

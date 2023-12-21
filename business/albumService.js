import { Album, Music, CoverImage, Artist } from "../models/models.js";
import { connectToDatabase } from "../config/db.js";
import s3 from "../aws-config/s3.js";

async function getAllAlbums() {
  try {
    await connectToDatabase();
    await Album.sync();

    const albums = await Album.findAll({
      include: [
        {
          model: Artist,
          as: "Artist",
        },
        {
          model: Music,
          as: "Music",
        },
      ],
    });

    const albumsWithUrls = await Promise.all(
      albums.map(async (album) => {
        // Fetch the cover image for the album
        const albumCoverImage = await CoverImage.findOne({
          where: { album_id: album.album_id },
        });

        const albumCover = albumCoverImage
          ? await s3.getFile(albumCoverImage.dataValues.url)
          : null;

        const musicList = await Promise.all(
          album.Music.map(async (music) => {
            // Fetch cover image for each music
            const coverImage = await CoverImage.findOne({
              where: { music_id: music.music_id },
            });

            const coverImageUrl = coverImage
              ? await s3.getFile(coverImage.dataValues.url)
              : null;

            // Use the music's file path for musicUrl, if available
            const musicUrl = music.dataValues.file_path
              ? await s3.getFile(music.dataValues.file_path)
              : null;

            return {
              ...music.dataValues,
              coverImageUrl,
              musicUrl,
            };
          })
        );

        return {
          ...album.dataValues,
          Artist: album.Artist.dataValues,
          Music: musicList,
          albumCover,
        };
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
    console.error("Error in addAlbum:", error);
    throw error;
  }
}


async function addMultipleAlbums(albumsData) {
  try {
    await connectToDatabase();
    await Album.sync();

    const addedAlbums = await Promise.all(
      albumsData.map(async (data) => {
        const addedResponse = await Album.create(data);
        return addedResponse;
      })
    );

    return addedAlbums;
  } catch (error) {
    console.error("Error in addMultipleAlbums:", error);
    throw error;
  }
}

async function getAlbumById(album_id) {
  try {
    await connectToDatabase();
    await Album.sync();

    const album = await Album.findOne({
      where: { album_id },
      include: [
        {
          model: Artist,
          as: "Artist",
        },
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
      where: { album_id },
    });

    const albumCoverImageUrl = albumCoverImage
      ? await s3.getFile(albumCoverImage.dataValues.url)
      : null;

    const musicList = await Promise.all(
      album.Music.map(async (music) => {
        // Fetch cover image for each music
        const coverImage = await CoverImage.findOne({
          where: { music_id: music.music_id },
        });

        const coverImageUrl = coverImage
          ? await s3.getFile(coverImage.dataValues.url)
          : null;

        // Use the music's file path for musicUrl, if available
        const musicUrl = music.dataValues.file_path
          ? await s3.getFile(music.dataValues.file_path)
          : null;

        return {
          ...music.dataValues,
          coverImageUrl,
          musicUrl,
        };
      })
    );

    return {
      ...album.dataValues,
      Artist: album.Artist.dataValues,
      Music: musicList,
      albumCoverImageUrl,
    };
  } catch (error) {
    console.error("Error in getAlbumById:", error);
    throw error;
  }
}


async function updateAlbum(album_id, data) {
  try {
    await connectToDatabase();
    await Album.sync();

    const existingAlbum = await Album.findOne({ where: { album_id } });

    if (!existingAlbum) {
      throw new Error(`Album with id ${album_id} not found.`);
    }

    const updatedResponse = await existingAlbum.update(data);

    return updatedResponse;
  } catch (error) {
    console.error("Error in updateAlbum:", error);
    throw error;
  }
}

async function deleteAlbum(album_id) {
  try {
    await connectToDatabase();
    await Album.sync();

    const existingAlbum = await Album.findOne({ where: { album_id } });

    if (!existingAlbum) {
      throw new Error(`Album with id ${album_id} not found.`);
    }

    await Music.destroy({
      where: { album_id },
    });

    const deletedResponse = await existingAlbum.destroy();

    return "alnum has succesfully been deleted !";
  } catch (error) {
    console.error("Error in deleteAlbum:", error);
    throw error;
  }
}

export default {
  getAllAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumById,
  addMultipleAlbums
};

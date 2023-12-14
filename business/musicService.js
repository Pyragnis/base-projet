import { connectToDatabase } from "../config/db.js";
import { Music, Album, Artist, CoverImage } from "../models/models.js";
import s3 from "../aws-config/s3.js";
import { parseBuffer } from "music-metadata";

async function getAllMusic() {
  try {
    await connectToDatabase();
    const musicList = await Music.findAll({
      include: [
        { model: Artist, as: "Artist" },
        { model: CoverImage, as: "CoverImage" },
        { model: Album, as: "Album" },
      ],
    });

    console.log(musicList, "00000000000");

    const musicWithUrls = await Promise.all(
      musicList.map(async (music) => {
        const url = await s3.getFile(music.dataValues.file_path);
        return { ...music.dataValues, url };
      })
    );

    return musicWithUrls;
  } catch (error) {
    console.error("Error in getAllMusic:", error);
    throw error;
  }
}

async function getMusicByTitle(title) {
  try {
    await connectToDatabase();
    await Music.sync();

    const music = await Music.findAll({
      where: { title: title },
    });

    if (!music) {
      throw new Error(`Song with title ${title} not found.`);
    }

    return music;
  } catch (error) {
    console.error("Error in getMusicByTitle:", error);
    throw error;
  }
}

async function getMusicById(music_id) {
  try {
    const music = await Music.findOne({
      where: { music_id },
      include: [
        { model: Artist, as: "Artist" },
        { model: CoverImage, as: "CoverImage" },
        { model: Album, as: "Album" },
      ],
    });

    if (!music) {
      throw new Error(`Song with id ${music_id} not found.`);
    }

    const url = await s3.getFile(music.dataValues.file_path);

    return { music, url };
  } catch (error) {
    console.error("Error in getMusicById:", error);
    throw error;
  }
}

async function addmusic(audioFileObj, additionalData) {
  try {
    await connectToDatabase();
    await Music.sync();

    const extensionIndex = audioFileObj.originalname.lastIndexOf(".");
    const title = audioFileObj.originalname.substring(0, extensionIndex);
    const ext = audioFileObj.originalname.substring(extensionIndex + 1);

    const uploadResult = await s3.uploadFile(audioFileObj, additionalData, ext);

    const metadata = await parseBuffer(audioFileObj.buffer, "audio/mpeg");

    if (uploadResult.cle) {
      const dbData = {
        title,
        file_path: uploadResult.cle,
        album_id: parseInt(additionalData.album_id),
        artist_id: parseInt(additionalData.artist_id),
      };

      const music = await Music.create(dbData);
      return music;
    } else {
      console.error("Filename not found in upload result.");
      throw new Error("Failed to add music. Please try again.");
    }
  } catch (error) {
    console.error("Error in addmusic:", error);
    throw error;
  }
}

async function deleteMusic(musicId) {
  try {
    await connectToDatabase();
    await Music.sync();

    const musicToDelete = await Music.findByPk(musicId);

    if (!musicToDelete) {
      throw new Error(`Music with ID ${musicId} not found.`);
    }

    const filepath = musicToDelete.dataValues.file_path;
    await s3.deleteFile(filepath);

    await musicToDelete.destroy();

    return `Music with ID ${musicId} deleted successfully.`;
  } catch (error) {
    console.error("Error in deleteMusic:", error);
    throw error;
  }
}

export default {
  getAllMusic,
  addmusic,
  deleteMusic,
  getMusicByTitle,
  getMusicById,
};

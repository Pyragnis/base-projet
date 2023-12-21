import { CoverImage } from "../models/models.js";
import { sequelize, connectToDatabase } from "../config/db.js";
import s3 from "../aws-config/s3.js";

async function getAllCovers() {
  try {
    await connectToDatabase();
    await CoverImage.sync();

    const covers = await CoverImage.findAll();

    const coversWithUrls = await Promise.all(
      covers.map(async (cover) => {
        const url = await s3.getFile(cover.url);
        return { ...cover.dataValues, url };
      })
    );

    return coversWithUrls;
  } catch (error) {
    console.error("Error in getAllCovers:", error);
    throw error;
  }
}

async function getCoverById(id) {
  try {
    await connectToDatabase();
    await CoverImage.sync();

    const cover = await CoverImage.findOne({
      where: { cover_id: id },
    });

    if (!cover) {
      throw new Error(`Cover with id ${id} not found.`);
    }

    const url = await s3.getFile(cover.url);

    return { cover, url };
  } catch (error) {
    console.error("Error in getCoverById:", error);
    throw error;
  }
}

async function addImage(file, data) {
  try {
    await connectToDatabase();
    await CoverImage.sync();

    const extensionIndex = file.originalname.lastIndexOf(".");
    const title = file.originalname.substring(0, extensionIndex);
    const ext = file.originalname.substring(extensionIndex + 1);

    const uploadResult = await s3.uploadFile(file, data, ext);

    if (uploadResult.cle) {
      const dbData = {
        url: uploadResult.cle,
        music_id: data.music_id ? parseInt(data.music_id) : null,
        album_id: data.album_id? parseInt(data.album_id) : null,
      };

      const cover = await CoverImage.create(dbData);
      return cover;
    } else {
      console.error("Filename not found in upload result.");
      throw new Error("Failed to add image. Please try again.");
    }
  } catch (error) {
    console.error("Error in addImage:", error);
    throw error;
  }
}

async function updateCover(data) {
  try {
    connectToDatabase();
    await CoverImage.sync();

    const updatedResponse = await CoverImage.update(data, {
      where: { cover_id: data.cover_id },
    });

    return updatedResponse;
  } catch (error) {
    console.error("Error in updateCover:", error);
    throw error;
  }
}

async function deleteCover(id) {
  try {
    await connectToDatabase();
    await CoverImage.sync();

    const deletedResponse = await CoverImage.destroy({
      where: { cover_id: id },
    });

    return deletedResponse;
  } catch (error) {
    console.error("Error in deleteCover:", error);
    throw error;
  }
}

export default {
  getAllCovers,
  getCoverById,
  addImage,
  updateCover,
  deleteCover,
};

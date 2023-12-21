import express from "express";
import coverService from "../business/coverService.js";
import multer from "multer";

const router = express.Router();

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/************************Get**************/
router.get("/", async (req, res) => {
  try {
    const music = await coverService.getAllCovers();
    res.json(music);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cover = await coverService.getCoverById(id);
    console.log(cover);
    res.status(200).json(cover);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/************************post**************/

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const imagefile = req.file;
    const { music_id, album_id } = req.body;

    if (!imagefile) {
      return res.status(400).json({ error: "Missing image file or data." });
    }

    if (music_id) {
      const imageData = {
        music_id,
        album_id: null,
      };
      const uploadImage = await coverService.addImage(imagefile, imageData);

      res.status(200).send(uploadImage);
    }

    if (album_id) {
      const imageData = {
        music_id: null,
        album_id,
      };
      const uploadImage = await coverService.addImage(imagefile, imageData);

      res.status(200).send(uploadImage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// New route to add multiple covers
router.post(
  "/addmultipleimages",
  upload.array("images", 10),
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const imageDataArray = req.body.data; // Assuming the request body contains an array of cover data

      if (
        !imageFiles ||
        !imageDataArray ||
        !Array.isArray(imageDataArray) ||
        imageFiles.length !== imageDataArray.length
      ) {
        return res
          .status(400)
          .json({ error: "Invalid image files or data provided." });
      }

      const uploadImages = await Promise.all(
        imageFiles.map(async (imageFile, index) => {
          const imageData = JSON.parse(imageDataArray[index]);
          return await coverService.addImage(imageFile, imageData);
        })
      );

      res.status(200).json(uploadImages);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************delete***********************/

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.query;

    console.log(id);
    const deletemusic = await coverService.deleteCover(id);
    res.status(200).send(deletemusic);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;

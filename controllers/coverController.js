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
    res.status(200).send(cover);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/************************post**************/

router.post("/addimage", upload.single("image"), async (req, res) => {
  try {
    const imagefile = req.file;
    const imageData = req.body;

    if (!imagefile || !imageData) {
      return res.status(400).json({ error: "Missing image  file or data." });
    }

    const uploadImage = await coverService.addImage(imagefile, imageData);

    res.status(200).send(uploadImage);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



/************************delete***********************/


router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.query;

    console.log(id);
    const deletemusic = await coverService.deleteCover(id);
    res, status(200).send(deletemusic);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;

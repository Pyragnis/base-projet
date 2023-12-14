import express from "express";
import musicService from "../business/musicService.js";
import multer from "multer";

const router = express.Router();

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/************************Get**************/
router.get("/", async (req, res) => {
  try {
    const music = await musicService.getAllMusic();
    res.json(music);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getbytitle", async (req, res) => {
  try {
    const { title } = req.body;
    const music = await musicService.getMusicByTitle(title);
    console.log(music);
    res.json(music);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id, "here iam---------")
    const music = await musicService.getMusicById(id);
    console.log(music);
    res.json(music);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/************************post**************/

router.post("/addmusic", upload.single("song"), async (req, res) => {
  try {
    const audiofile = req.file;

    console.log(audiofile, "99e8u8e8u8u8u");
    const audiodata = req.body;

    console.log(audiodata, 'cii poisisii')

    if (!audiofile || !audiodata) {
      return res.status(400).json({ error: "Missing audio file or data." });
    }

    console.log(audiofile);
    console.log(audiodata);

    const uploadmusic = await musicService.addmusic(audiofile, audiodata);

    res.status(200).send(uploadmusic);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.query;

    console.log(id);
    const deletemusic = await musicService.deleteMusic(id);
    res, status(200).send(deletemusic);
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
});

export default router;

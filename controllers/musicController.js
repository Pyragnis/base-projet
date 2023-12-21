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
    console.log(id, "here I am---------");
    const music = await musicService.getMusicById(id);
    console.log(music);
    res.json(music);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/************************post**************/

router.post("/addmusic", upload.single("songfile"), async (req, res) => {
  try {
    const audioFile = req.file;
    const audioData = req.body;


    console.log(audioFile, "fil--------e")
    console.log(audioData, "audiodata")


    if (!audioFile) {
      return res.status(400).json({ error: "Missing audio file." });
    }

    const name = audioData.name;
    const albumId =  audioData.album_id;
    const artistId = audioData.artist_id;

    if (!name || !albumId || !artistId) {
      return res.status(400).json({ error: "Missing required form data." });
    }

    console.log(audioFile);
    console.log(audioData);

    const uploadMusic = await musicService.addMusic(audioFile, {
      name,
      albumId,
      artistId,
    });

    res.status(200).send(uploadMusic);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.query;

    console.log(id);
    const deleteMusic = await musicService.deleteMusic(id);
    res.status(200).send(deleteMusic);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;

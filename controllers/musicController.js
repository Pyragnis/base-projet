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

// Updated Get Music by ID route
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const music = await musicService.getMusicById(id);
    console.log(music);
    res.json(music);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/************************Post**************/

router.post("/addmusic", upload.single("song"), async (req, res) => {
  try {
    const audioFile = req.file;
    const { name, album_id, artist_id } = req.body; // Use req.body for JSON data

    console.log(audioFile, "file");
    console.log(req.body, "audio data");

    if (!audioFile) {
      return res.status(400).json({ error: "Missing audio file." });
    }

    if (!name) {
      return res.status(400).json({ error: "Missing required form data." });
    }

    if(album_id){
      const uploadMusic = await musicService.addMusic(audioFile, {
        name,
        album_id: album_id, 
      });
      res.status(200).send(uploadMusic);
    }

    if(artist_id){
      const uploadMusic = await musicService.addMusic(audioFile, {
        name,
        artist_id: artist_id,
      });
      res.status(200).send(uploadMusic);
    }
    

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/************************Delete**************/

router.delete("/delete/:id", async (req, res) => {
  try {
    const id  = req.params.id;

    console.log(id);
    const deleteMusic = await musicService.deleteMusic(id);
    res.status(200).send(deleteMusic);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;

import express from "express";
import { albumBusinesses } from "../business/albumService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const albums = await albumBusinesses.getAllAlbums();
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addalbum", async (req, res) => {
  try {
    const { title, artist_id } = req.body;

    console.log(artist_id)

    const creationData = {
      title: title,
      artist_id: artist_id,
    };

    const createAlbum = await albumBusinesses.addAlbums(creationData);

    res.status(200).send(createAlbum);
  } catch (error) {}
});

export default router;

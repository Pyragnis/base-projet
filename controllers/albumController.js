import express from "express";
import albumBusinesses from "../business/albumService.js";

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



router.get("/getbyid", async (req, res) => {
  try {
    const {id} = req.query
    const albums = await albumBusinesses.getAlbumByid(id);
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addalbum", async (req, res) => {
  try {
    const { title, release_date, genre, description, artist_id } = req.body;

    console.log(artist_id);

    const creationData = {
      title: title,
      release_date: release_date,
      genre: genre,
      description: description,
      artist_id: artist_id,
    };

    const createAlbum = await albumBusinesses.addAlbum(creationData);

    res.status(200).send(createAlbum);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.query;

    const deleteAlbum = await albumBusinesses.deleteAlbums(id);

    res.status(200).send(deleteAlbum);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update", async (req, res) => {
  try {
    const { title, artist_id } = req.body;

    console.log(artist_id);

    const creationData = {
      title: title,
      artist_id: artist_id,
    };

    const updateAlbum = await albumBusinesses.updateAlbums(creationData);

    res.status(200).send(updateAlbum);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

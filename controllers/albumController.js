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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const albums = await albumBusinesses.getAlbumById(id);
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, release_date, genre, description, artist_id } = req.body;

    const creationData = {
      title,
      release_date,
      genre,
      description,
      artist_id,
    };


    // console.log(title, release_date, genre, description, artist_id)

    const createAlbum = await albumBusinesses.addAlbum(creationData);

    const updatedAlbums = await albumBusinesses.getAllAlbums();

    res.status(200).json(createAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/addMultiple", async (req, res) => {
  try {
    const albumsData = req.body;

    if (!Array.isArray(albumsData) || albumsData.length === 0) {
      return res.status(400).json({ error: "Invalid album data provided." });
    }

    const addedAlbums = await albumBusinesses.addMultipleAlbums(albumsData);

    // const updatedAlbums = await albumBusinesses.getAllAlbums();

    res.status(201).json(addedAlbums);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAlbum = await albumBusinesses.deleteAlbum(id);

    res.status(200).send(deleteAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist_id } = req.body;

    // console.log(artist_id);

    const updateData = {
      title,
      artist_id,
    };

    const updateAlbum = await albumBusinesses.updateAlbum(id, updateData);

    res.status(200).send(updateAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


export default router;

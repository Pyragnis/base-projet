import express from "express";
import artistService from "../business/artistService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const artists = await artistService.getAllArtists();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await artistService.getArtistById(id);

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/addartist", async (req, res) => {
  try {
    const { name, bio } = req.body;

    const creationData = {
      name: name,
      bio: bio
    };

    const createArtist = await artistService.addArtist(creationData);

    res.status(200).send(createArtist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


router.post("/addMultipleArtists", async (req, res) => {
  try {
    const artistsData = req.body; // Assuming the request body contains an array of artist data

    if (!artistsData || !Array.isArray(artistsData) || artistsData.length === 0) {
      return res.status(400).json({ error: "Invalid artist data provided." });
    }

    const addedArtists = await artistService.addMultipleArtists(artistsData);

    res.status(201).json(addedArtists);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.put("/update", async (req, res) => {
  try {
    const { name } = req.body;

    const creationData = {
      name: name,
    };

    const updateartist = await artistService.updateArtistdata(creationData);

    res.status(200).send(updateartist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.query;

    const deleteartst = await artistService.deleteArtist(id);

    res.status(200).send({ message: `Artist with id ${id} has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;

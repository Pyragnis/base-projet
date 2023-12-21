import express from "express";
import artistService from "../business/artistService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const artists = await artistService.getAllArtists();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addartist", async (req, res) => {
  try {
    const { name, bio } = req.body;

    const artistData = {
      name: name,
      bio: bio,
    };

    const createArtist = await artistService.addArtist(artistData);

    res.status(201).json(createArtist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addMultipleArtists", async (req, res) => {
  try {
    const artistsData = req.body;

    if (!Array.isArray(artistsData) || artistsData.length === 0) {
      return res.status(400).json({ error: "Invalid artist data provided." });
    }

    const addedArtists = await artistService.addMultipleArtists(artistsData);

    res.status(201).json(addedArtists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const artistId = req.params.id;
    const { name, bio } = req.body;

    if (!artistId || !name) {
      return res.status(400).json({ error: "Missing required data for update." });
    }

    const updateData = {
      name: name,
      bio: bio
    };

    const updatedArtist = await artistService.updateArtistdata(artistId, updateData);

    if (!updatedArtist) {
      return res.status(404).json({ error: `Artist with ID ${artistId} not found` });
    }

    res.status(200).json(updatedArtist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const  artist_id  = req.params.id;

    const deleteArtist = await artistService.deleteArtist(artist_id);

    res.status(200).json({ message: `Artist with id ${artist_id} has been deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

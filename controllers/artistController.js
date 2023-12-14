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

router.post("/addartist", async (req, res) => {
  try {
    const { name } = req.body;

    const creationData = {
      name: name,
    };

    const createArtist = await artistService.addArtist(creationData);

    res.status(200).send(createArtist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
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

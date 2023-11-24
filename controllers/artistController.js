import express from "express";
import { artistBusinesses } from "../business/artistService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const artists = await artistBusinesses.getAllArtists();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

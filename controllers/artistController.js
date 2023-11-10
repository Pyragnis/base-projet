const express = require('express');
const artistService = require('../services/artistService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const artists = await artistService.getAllArtists();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other routes for artists...

module.exports = router;

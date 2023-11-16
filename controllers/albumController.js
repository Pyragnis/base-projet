const express = require('express');
const albumService = require('../business/albumService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const albums = await albumService.getAllAlbums();
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;

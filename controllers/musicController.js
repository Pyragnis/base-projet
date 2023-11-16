const express = require('express');
const musicService = require('../business/musicService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const music = await musicService.getAllMusic();
    res.json(music);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;

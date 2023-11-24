import express from 'express';
import {albumBusinesses} from '../business/albumService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const albums = await albumBusinesses.getAllAlbums();
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


export default router;

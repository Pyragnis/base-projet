const express = require('express');
const router = express.Router();
const { pool } = require('../db'); // Importer la connexion à la base de données depuis db.js

// Route pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * ');
    res.json(result.rows);
    client.release();
  } catch (err) {
    res.status(500).send('Erreur de la base de données');
  }
});

module.exports = router;

const express = require('express');
const { createDatabaseAndTables } = require('./db');

const app = express();
const port = 3000;

app.listen(port, async () => {
  console.log(`Le serveur écoute sur le port ${port}`);
  
  // Créer la base de données et les tables si elles n'existent pas encore
  await createDatabaseAndTables();
});

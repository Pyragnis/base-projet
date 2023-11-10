const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware pour parser les requêtes JSON

const usersRoute = require('./routes/users'); // Importer les routes pour les utilisateurs
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

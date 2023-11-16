const express = require('express');
const bodyParser = require('body-parser');
const artistRoutes = require('./controllers/artistController');
const albumRoutes = require('./controllers/albumController');
const musicRoutes = require('./controllers/musicController');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));

// Routes
app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/music', musicRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const musicRoutes = require('./routes/musicRoutes');
const config = require('./config');

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

import express from "express";
import bodyParser from "body-parser";
import albumController from "./controllers/albumController.js";
import artistController from "./controllers/artistController.js";
import musicController from "./controllers/musicController.js";
import coverController from './controllers/coverController.js'
import 'dotenv/config'
import art from './art.js'

const app = express();
const port = process.env.SERVER_PORT;

// Middleware
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

// Routes
app.use("/artists", artistController);
app.use("/albums", albumController);
app.use("/music", musicController);
app.use('/cover',coverController)


app.listen(port, () => {
  console.log(art)
});

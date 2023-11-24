import express from "express";
import bodyParser from "body-parser";
import albumController from "./controllers/albumController.js";
import artistController from "./controllers/artistController.js";
import musicController from "./controllers/musicController.js";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

// Routes
app.use("/artists", artistController);
app.use("/albums", albumController);
app.use("/music", musicController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

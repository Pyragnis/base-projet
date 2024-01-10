import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import bodyParser from "body-parser";
import albumController from "./controllers/albumController.js";
import artistController from "./controllers/artistController.js";
import musicController from "./controllers/musicController.js";
import coverController from "./controllers/coverController.js";
import roomController from "./controllers/roomController.js";

import "dotenv/config";
import art from "./art.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust as needed for your environment
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

app.use("/artists", artistController);
app.use("/albums", albumController);
app.use("/music", musicController);
app.use("/cover", coverController);
app.use("/rooms/", roomController);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on('joinRoom', (roomId) => {
    console.log(roomId,"hello")
    socket.join(roomId);
    io.to(roomId).emit('userJoined', socket.id); 
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    io.to(roomId).emit('userLeft', socket.id); 
  });

  socket.on('createRoom', (roomId) => {
    // Handle room creation logic
    socket.join(roomId);
    // Notify the user that they created and joined the room
  });

  socket.on('playMusic', (roomId, musicData) => {
    io.to(roomId).emit('playMusic', musicData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(art);
  console.log(`Server is running on port ${port}`);
});

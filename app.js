import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import bodyParser from "body-parser";
import albumController from "./controllers/albumController.js";
import artistController from "./controllers/artistController.js";
import musicController from "./controllers/musicController.js";
import coverController from "./controllers/coverController.js";
import roomController from "./controllers/roomController.js";
import art from './art.js'

import "dotenv/config";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const roomUsers = {}; // Track users in each room

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
    socket.join(roomId);
    if (!roomUsers[roomId]) {
      roomUsers[roomId] = new Set();
    }
    roomUsers[roomId].add(socket.id);
    io.to(roomId).emit('roomUpdate', Array.from(roomUsers[roomId]));
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    if (roomUsers[roomId]) {
      roomUsers[roomId].delete(socket.id);
      if (roomUsers[roomId].size === 0) {
        delete roomUsers[roomId];
      } else {
        io.to(roomId).emit('roomUpdate', Array.from(roomUsers[roomId]));
      }
    }
    console.log(`User ${socket.id} left room: ${roomId}`);
  });

  socket.on('playMusic', (roomId, musicData) => {
    io.to(roomId).emit('playMusic', musicData);
  });

  socket.on('pauseMusic', (roomId) => {
    io.to(roomId).emit('pauseMusic');
  });

  socket.on('nextTrack', (roomId) => {
    io.to(roomId).emit('nextTrack');
  });

  socket.on('prevTrack', (roomId) => {
    io.to(roomId).emit('prevTrack');
  });

  socket.on('changeVolume', (roomId, volumeLevel) => {
    io.to(roomId).emit('changeVolume', volumeLevel);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    Object.keys(roomUsers).forEach(roomId => {
      if (roomUsers[roomId].has(socket.id)) {
        roomUsers[roomId].delete(socket.id);
        if (roomUsers[roomId].size === 0) {
          delete roomUsers[roomId];
        } else {
          io.to(roomId).emit('roomUpdate', Array.from(roomUsers[roomId]));
        }
      }
    });
  });
});

const port =  5000;
server.listen(port, () => {
  console.log(art)
});

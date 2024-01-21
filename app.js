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
import cors from "cors";
import art from './art.js'

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
const roomPlayerState = {}; // Keep track of player state in each room

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

app.use("/artists", artistController);
app.use("/albums", albumController);
app.use("/music", musicController);
app.use("/cover", coverController);
app.use("/rooms", roomController);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    roomUsers[roomId] = roomUsers[roomId] || new Set();
    roomUsers[roomId].add(socket.id);


    console.log(roomUsers, "helooooooo")
    
    // Notify all users in the room about the new user
    io.to(roomId).emit('roomUpdate', {
      users: Array.from(roomUsers[roomId]),
      message: `User ${socket.id} joined the room`,
      socketId: socket.id,
    });
    
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Player control events
  socket.on('play', (roomId) => {
    console.log("you are here ", roomId)
    io.to(roomId).emit('play');
    roomPlayerState[roomId] = { ...roomPlayerState[roomId], playing: true };
    
    // Log the play event and room ID
    console.log(`Play event emitted in room: ${roomId}`);
  });

  socket.on('pause', (roomId) => {
    io.to(roomId).emit('pause');
    roomPlayerState[roomId] = { ...roomPlayerState[roomId], playing: false };
    
    // Log the pause event and room ID
    console.log(`Pause event emitted in room: ${roomId}`);
  });

  socket.on('changeTrack', (roomId, trackId) => {
    console.log("hivhangingiiiiiiiii", roomId)
    io.to(roomId).emit('changeTrack', trackId);
    roomPlayerState[roomId] = { ...roomPlayerState[roomId], currentTrack: trackId };
    
    // Log the changeTrack event, track ID, and room ID
    console.log(`ChangeTrack event emitted in room: ${roomId}, Track ID: ${trackId}`);
  });

  socket.on('seek', (roomId, time) => {
    io.to(roomId).emit('seek', time);
    roomPlayerState[roomId] = { ...roomPlayerState[roomId], seekTime: time };

    console.log(roomPlayerState, "helloooooo")
    
    // Log the seek event, time, and room ID
    console.log(`Seek event emitted in room: ${roomId}, Time: ${time}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    if (roomUsers[roomId]) {
      roomUsers[roomId].delete(socket.id);
      if (roomUsers[roomId].size === 0) {
        delete roomUsers[roomId];
        delete roomPlayerState[roomId]; // Clear player state if room is empty
      } else {
        io.to(roomId).emit('roomUpdate', {
          users: Array.from(roomUsers[roomId]),
          message: `User ${socket.id} left the room`,
        });
      }
    }
    console.log(`User ${socket.id} left room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    Object.keys(roomUsers).forEach(roomId => {
      if (roomUsers[roomId].has(socket.id)) {
        roomUsers[roomId].delete(socket.id);
        if (roomUsers[roomId].size === 0) {
          delete roomUsers[roomId];
          delete roomPlayerState[roomId];
        } else {
          io.to(roomId).emit('roomUpdate', {
            users: Array.from(roomUsers[roomId]),
            message: `User ${socket.id} disconnected`,
          });
        }
      }
    });
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(art);
});

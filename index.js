const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("connect_tables_restaurant", (restaurant) => {
    socket.join(restaurant);
  });
  socket.on("quest_table", (data) => {
    socket.to(data.restaurant).emit("new_quest", data.restaurant);
  });
  socket.on("call_waitres", (data) => {
    socket.to(data.restaurant).emit("call_waitres", data.table);
  });
});

io.listen(3001);

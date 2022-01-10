const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;

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

io.listen(httpServer);
httpServer.listen(PORT, () => {
  console.log("Server is listening at http://localhost:" + PORT);
});

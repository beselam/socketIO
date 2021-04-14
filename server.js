"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join room", (roomName) => {
    socket.join(roomName);
  });

  socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
    console.log("on server");
    if (isChannel) {
      const payload = { content, chatName, sender };

      socket.to(to).emit("new message", payload);
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});

"use strict";

let message = document.getElementById("message"),
  username = document.getElementById("username"),
  sendMessage = document.getElementById("send"),
  output = document.getElementById("output"),
  room = document.getElementById("room"),
  room2 = document.getElementById("room2");

const socket = io();
let roomName = "general";
room.addEventListener("click", () => {
  roomName = "room1";
  socket.emit("join room", roomName);
});

room2.addEventListener("click", () => {
  roomName = "room2";
  socket.emit("join room", roomName);
});

sendMessage.addEventListener("click", () => {
  console.log("clicked");
  const payload = {
    content: message.value,
    to: roomName,
    sender: username.value,
    chatName: roomName,
    isChannel: true,
  };
  socket.emit("send message", payload);
  message.value = "";
});

socket.on("new message", ({ content, sender, chatName }) => {
  console.log("new message", sender, chatName);
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + sender + chatName + ": </strong>" + content + "</p>";
});

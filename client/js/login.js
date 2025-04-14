import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const elForm = document.querySelector(".login-form");
const socket = io("http://localhost:3000");

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const room = document.querySelector(".nameRoom").value;
  const name = e.target.name.value;

  socket.emit("login", { name, room });

  socket.on("login", (data) => {
    console.log(data);
    
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "/";
  });
});


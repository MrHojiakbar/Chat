import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
const elForm = document.querySelector(".login-form");

const socket = io("http://10.10.3.85:4000")

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  socket.emit("login", name);
  socket.on("login", ({ data }) => {
    localStorage.setItem("user", JSON.stringify(data));
    user = data;    
  });
  
  window.location.href = "/";
});

import { io } from "https:/cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");
const elForm = document.querySelector(".login-form");

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  localStorage.setItem("name", name);

  socket.emit("login", name);
  socket.on("login", ({data}) => {
    console.log(data.name, "profile active");
  });
});

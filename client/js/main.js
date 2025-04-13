import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

const elMessages = document.querySelector(".messages");
const elForm = document.querySelector(".uwu");
const elInput = document.querySelector(".message-input");

let name = localStorage.getItem("name");
let user = null;

socket.emit("login", name);

socket.on("login", ({ data }) => {
  localStorage.setItem("user", JSON.stringify(data));
  user = data;
});

socket.on("messages", (msgs) => {
    elMessages.innerHTML = "";
    
    console.log("keldi mana data ");
    msgs.forEach((msg) => {
        if (msg.type === "message") {
            const html = `
            <div class="${msg.user._id === user._id ? "my-messages align-self-end text-end" : "other-messages"}">
                <p class="border d-inline-block p-2">${msg.text}</p>
                <div class="author fs-6 fw-bolder">${msg.user.name.slice(0, 25)} <span>${msg.createdAt}</span></div>
            </div>
            `;
            elMessages.insertAdjacentHTML("beforeend", html);
        } else if (msg.type === "join-message") {
            elMessages.insertAdjacentHTML("beforeend", `
            <div class="join-message">
                <p class="text-primary text-center border">${msg.name.slice(0, 20)} chatga qo'shildi! <span>${msg.createdAt}</span></p>
            </div>
            `);
        }
    });
});


elInput.addEventListener("keyup", (e) => {  
    socket.emit("typing", { user: user._id });
});

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = elInput.value.trim();
  if (text && user) {
    socket.emit("message", { user: user._id, text });
    elInput.value = ""; 
  }
});

export default socket;

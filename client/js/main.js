import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io("http://10.10.3.85:4000");

const elMessages = document.querySelector(".messages");
const elForm = document.querySelector(".uwu");
const elInput = document.querySelector(".message-input");

let user = JSON.parse(localStorage.getItem("user"))

socket.emit("join",user)

socket.on("typing",(name)=>{
    document.querySelector(".text-info").textContent=`${name} yozmoqda`
})
socket.on("messages", (msgs) => {
    elMessages.innerHTML = "";
    msgs.forEach((msg) => {
        if (msg.user) {
            if (msg.type === "message") {
                const html = `
                <div class="${msg.user._id === user._id ? "my-messages align-self-end text-end" : "other-messages"}">
                    <p class="border d-inline-block p-2">${msg.text}</p>
                    <div class="author fs-6 fw-bolder">${msg.user.name} <span>${msg.createdAt}</span></div>
                </div>
                `;
                elMessages.insertAdjacentHTML("beforeend", html);
            } else if (msg.type === "join-message") {
                elMessages.insertAdjacentHTML("beforeend", `
                <div class="join-message">
                    <p class="text-primary text-center border">${msg.user.name} chatga qo'shildi! <span>${msg.createdAt}</span></p>
                </div>
                `);
            }
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
    const data={ user: user._id, text }
    
    socket.emit("message", data);
    elInput.value = ""; 
  }
});

export default socket;

import {io} from "https:/cdn.socket.io/4.8.1/socket.io.esm.min.js"

const socket = io("http://localhost:3000");

socket.emit("message","Salom frontdan")

socket.on("message",(res)=>{
    console.log(res,"Serverdan javob");
    
})
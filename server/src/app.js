import express from "express";
import cors from "cors";
import morgan from "morgan"
import {config} from "dotenv"
import {createServer} from "node:http"
import {Server} from "socket.io";
import userService from "./modules/user/user.service.js";
import userModel from "./modules/user/user.model.js"
import messageModel from "./modules/messages/message.model.js"

config()

const app=express()
const server=createServer(app)

export const io=new Server(server,{
    cors:{
        origin:"*"
    }
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:"*"
}))



if (process.env.NODE_ENV=="develop") {
    app.use(morgan("tiny"))
}

io.on("connection", (socket) => {
    console.log("connected")
    socket.on("typing",async(data)=>{
        const user=await userModel.findById(data?.user)
        console.log(data,user);
        
        socket.broadcast.emit("typing",user?.name)
    })
    socket.on("message", async (data) => {
        
        const newMess = await messageModel.create({
            text: data.text,
            user: data.user
        });
    
        const allMessages = await messageModel.find().populate('user');
        
        io.to(data.room).emit("messages", allMessages);
    });
    socket.on("login", async (data) => {
        console.log(`User ${data.name} shu room ga kirmoqchi ${data.room}`);
        
        const newUser = await userService.createUser(data.name);
    
        const previousRoom = socket.rooms.values().next().value;
        if (previousRoom && previousRoom !== data.room) {
            socket.leave(previousRoom);
            console.log(`${data.name} shu roomdan chiqib ketdi ${previousRoom}`);
        }
    
        if (data.room) {
            socket.join(data.room);
            console.log(`${data.name} shu room ga qoshildi ${data.room}`);
        }
    
        socket.emit("login", { ...newUser, room: data.room });
    });
    
    socket.on("join", async (data) => {
        await messageModel.create({
            type: "join-message",
            user: data.user
        });
    
        const previousRoom = socket.rooms.values().next().value;
        if (previousRoom && previousRoom !== data.room) {
            socket.leave(previousRoom);
            console.log(`${data.user} left room ${previousRoom}`);
        }
    
        socket.join(data.room);
        console.log(`${data.user} joined room ${data.room}`);
        
        const allMessages = await messageModel.find().populate("user");
        io.to(data.room).emit("messages", allMessages);
    });
    
    
})
export default server
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
        
        socket.broadcast.emit("typing",user?.name)
    })
    socket.on("login", async (data) => {
        console.log("come to login")
        const user = await userService.createUser(data)
        socket.emit("login", user)
    })
    socket.on("message",async (data)=>{
        
        await messageModel.create({
            text:data.text,
            user:data.user
        })
        const allMessages = await messageModel.find().populate('user', null, null, { strictPopulate: false });
        socket.emit("messages",allMessages)
    })
    socket.on("join",async (data) => {

        await messageModel.create({
            type:"join-message",
            user:data.user
        })
        const allMesages=await messageModel.find().populate("user")
        socket.emit("messages",allMesages)
    })
})
export default server
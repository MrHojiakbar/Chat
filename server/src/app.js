import express from "express";
import cors from "cors";
import morgan from "morgan"
import {config} from "dotenv"
import {createServer} from "node:http"
import {Server} from "socket.io";
import userService from "./modules/user/user.service.js";

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
    socket.on("login", async (data) => {
        console.log("come to login")
        const user = await userService.createUser(data)
        socket.emit("login", user)
    })
})
export default server
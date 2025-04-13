import server from "./app.js";
import { connectDB } from "./configs/mongo.config.js";
import { config } from "dotenv";

connectDB()
config()

server.listen(process.env.APP_PORT||5000,()=>{
    console.log(`http://localhost:${process.env.APP_PORT}`);
})
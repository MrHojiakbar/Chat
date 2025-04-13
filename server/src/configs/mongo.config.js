import { config } from "dotenv";
import mongoose from "mongoose"

config()

export const connectDB=async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
        
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
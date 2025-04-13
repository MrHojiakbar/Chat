import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
    {
        name:String,
    },
    {
        collection:"user",
        timestamps:true,
        versionKey:false
    }
)
export default UserSchema
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
const User = mongoose.model("User", UserSchema);

export default User;
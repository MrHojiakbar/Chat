import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
    {
        name:String,
        messages:[{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Message"
        }]
    },
    {
        collection:"user",
        timestamps:true,
        versionKey:false
    }
)
const User = mongoose.model("User", UserSchema);

export default User;
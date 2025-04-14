import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
      text: String,
      type: {
        type: String,
        enum: ["message", "join-message"],
        default: "message",
      },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User", 
      },
    },
    {
      collection: "messages", // ✅ To‘g‘ri kollektsiya nomi
      timestamps: true,
      versionKey: false,
    }
  );
  
const Message = mongoose.model("Messages", MessageSchema);

export default Message;
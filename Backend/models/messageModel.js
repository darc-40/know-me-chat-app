const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messageTpe: {
      type: String,
      enum: ["text", "image"],
    },
    message: String,
    imageUrl: String,
  },

  { timestamps: true }
);
module.export = mongoose.model("Message", messageSchema)
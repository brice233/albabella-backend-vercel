import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
    },
    resource_type: {
      type: String,
      enum: ["image", "video", "raw", "auto"],
      default: "image",
    },
    format: String,
    bytes: Number,
    width: Number,
    height: Number,
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Media", mediaSchema);

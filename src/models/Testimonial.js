import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Please add a client name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    position: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    testimonial: {
      type: String,
      required: [true, "Please add the testimonial text"],
    },
    image: {
      public_id: String,
      url: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Testimonial", testimonialSchema);

import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a product title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Please add a short description"],
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a full description"],
    },
    mainImage: {
      public_id: String,
      url: String,
    },
    gallery: [
      {
        public_id: String,
        url: String,
      },
    ],
    specifications: [
      {
        name: String,
        value: String,
      },
    ],
    applications: [String],
    industries: [String],
    downloads: [
      {
        title: String,
        fileUrl: String,
        public_id: String,
      },
    ],
    relatedServices: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    seo: {
      title: String,
      description: String,
      keywords: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title
productSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

export default mongoose.model("Product", productSchema);

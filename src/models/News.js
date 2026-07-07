import mongoose from "mongoose";
import slugify from "slugify";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [150, "Title cannot be more than 150 characters"],
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Please add content"],
    },
    featuredImage: {
      public_id: String,
      url: String,
    },
    gallery: [
      {
        public_id: String,
        url: String,
      },
    ],
    author: {
      type: String,
      default: "Admin",
    },
    tags: [String],
    categories: [String],
    publishDate: {
      type: Date,
      default: Date.now,
    },
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
newsSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("News", newsSchema);

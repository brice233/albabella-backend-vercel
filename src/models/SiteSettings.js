import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "Albabella Company Ltd",
    },
    contactEmail: {
      type: String,
      default: "info@albabella.com",
    },
    contactPhone: {
      type: String,
      default: "+250 788 000 000",
    },
    whatsapp: {
      type: String,
      default: "+250 788 000 000",
    },
    address: {
      type: String,
      default: "Plot 45, Industrial Zone, Kigali, Rwanda",
    },
    businessHours: {
      type: String,
      default: "Mon - Fri: 8:00 AM - 6:00 PM",
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    seo: {
      metaTitle: {
        type: String,
        default: "Albabella Company Ltd | Diversified Industrial Excellence",
      },
      metaDescription: {
        type: String,
        default: "Rwanda-based conglomerate advancing infrastructure, manufacturing, logistics, and trade across the continent.",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);

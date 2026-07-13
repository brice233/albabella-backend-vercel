import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const productsData = [
  {
    title: "Precision Industrial Machinery",
    shortDescription: "Heavy-duty machinery configured for regional production standards.",
    description: "Our precision industrial machinery is configured for regional production standards, delivering reliable performance in demanding manufacturing environments across East Africa.",
    industries: ["Manufacturing"],
    mainImage: { public_id: "products/machinery", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" },
    isActive: true,
  },
  {
    title: "Enterprise Power Systems",
    shortDescription: "Reliable grid-tied and off-grid power solutions for commercial sites.",
    description: "Enterprise-grade power systems providing reliable grid-tied and off-grid solutions for commercial and industrial sites, ensuring uninterrupted operations.",
    industries: ["Energy"],
    mainImage: { public_id: "products/power", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" },
    isActive: true,
  },
  {
    title: "Civil Engineering Equipment",
    shortDescription: "Specialised equipment for large-scale construction and earthworks.",
    description: "Specialised heavy equipment for large-scale construction projects including earthworks, foundation laying, and structural assembly across the region.",
    industries: ["Infrastructure"],
    mainImage: { public_id: "products/construction", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
    isActive: true,
  },
  {
    title: "Agricultural Inputs",
    shortDescription: "Fertilisers, seed, and mechanisation solutions sourced from trusted global partners.",
    description: "Comprehensive agricultural inputs including fertilisers, certified seeds, and mechanisation solutions sourced from trusted global partners for regional farming operations.",
    industries: ["Agriculture"],
    mainImage: { public_id: "products/agriculture", url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" },
    isActive: true,
  },
  {
    title: "Trade Commodities",
    shortDescription: "Bulk agricultural and mineral commodities for regional and export markets.",
    description: "Strategic sourcing and distribution of bulk agricultural and mineral commodities serving both regional consumption and international export markets.",
    industries: ["Trading"],
    mainImage: { public_id: "products/commodities", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" },
    isActive: true,
  },
  {
    title: "IT & Network Infrastructure",
    shortDescription: "Enterprise networking, servers, and secure connectivity hardware.",
    description: "Complete IT infrastructure solutions including enterprise networking equipment, server hardware, and secure connectivity solutions for modern business operations.",
    industries: ["Technology"],
    mainImage: { public_id: "products/tech", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" },
    isActive: true,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("Existing products deleted");

    await Promise.all(productsData.map(product => Product.create(product)));
    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();

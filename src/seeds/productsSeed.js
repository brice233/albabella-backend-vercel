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
    isActive: true,
  },
  {
    title: "Enterprise Power Systems",
    shortDescription: "Reliable grid-tied and off-grid power solutions for commercial sites.",
    description: "Enterprise-grade power systems providing reliable grid-tied and off-grid solutions for commercial and industrial sites, ensuring uninterrupted operations.",
    industries: ["Energy"],
    isActive: true,
  },
  {
    title: "Civil Engineering Equipment",
    shortDescription: "Specialised equipment for large-scale construction and earthworks.",
    description: "Specialised heavy equipment for large-scale construction projects including earthworks, foundation laying, and structural assembly across the region.",
    industries: ["Infrastructure"],
    isActive: true,
  },
  {
    title: "Agricultural Inputs",
    shortDescription: "Fertilisers, seed, and mechanisation solutions sourced from trusted global partners.",
    description: "Comprehensive agricultural inputs including fertilisers, certified seeds, and mechanisation solutions sourced from trusted global partners for regional farming operations.",
    industries: ["Agriculture"],
    isActive: true,
  },
  {
    title: "Trade Commodities",
    shortDescription: "Bulk agricultural and mineral commodities for regional and export markets.",
    description: "Strategic sourcing and distribution of bulk agricultural and mineral commodities serving both regional consumption and international export markets.",
    industries: ["Trading"],
    isActive: true,
  },
  {
    title: "IT & Network Infrastructure",
    shortDescription: "Enterprise networking, servers, and secure connectivity hardware.",
    description: "Complete IT infrastructure solutions including enterprise networking equipment, server hardware, and secure connectivity solutions for modern business operations.",
    industries: ["Technology"],
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

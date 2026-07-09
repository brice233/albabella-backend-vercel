import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const servicesData = [
  {
    title: "Industrial Manufacturing",
    shortDescription: "High-capacity production of essential goods with rigorous quality control across our facilities.",
    description: "Our industrial manufacturing division focuses on the high-capacity production of essential goods. We maintain rigorous quality control across all our facilities to ensure top-tier outputs.",
    icon: { public_id: "factory", url: "" },
    displayOrder: 1,
    isActive: true,
  },
  {
    title: "Logistics & Distribution",
    shortDescription: "End-to-end supply chain management across regional borders with modern fleet and warehousing.",
    description: "We provide end-to-end supply chain management across regional borders. Our modern fleet and extensive warehousing capabilities ensure timely and secure distribution.",
    icon: { public_id: "truck", url: "" },
    displayOrder: 2,
    isActive: true,
  },
  {
    title: "Commodity Trading",
    shortDescription: "Strategic sourcing and trade of agricultural and mineral resources on a global scale.",
    description: "Our commodity trading arm engages in the strategic sourcing and trade of agricultural and mineral resources on a global scale, maximizing value for all stakeholders.",
    icon: { public_id: "line-chart", url: "" },
    displayOrder: 3,
    isActive: true,
  },
  {
    title: "Civil Infrastructure",
    shortDescription: "Turnkey delivery of large construction and industrial development projects.",
    description: "We deliver turnkey solutions for large construction and industrial development projects, from initial design and engineering to final commissioning.",
    icon: { public_id: "hard-hat", url: "" },
    displayOrder: 4,
    isActive: true,
  },
  {
    title: "Energy Solutions",
    shortDescription: "Reliable power distribution, renewable integration, and energy advisory for enterprise clients.",
    description: "Our energy solutions encompass reliable power distribution, renewable integration, and comprehensive energy advisory services for enterprise clients.",
    icon: { public_id: "zap", url: "" },
    displayOrder: 5,
    isActive: true,
  },
  {
    title: "Advisory & Consulting",
    shortDescription: "Senior expertise in market entry, operations, compliance, and regional expansion strategy.",
    description: "We offer senior-level expertise in market entry, operations, compliance, and regional expansion strategy to help businesses thrive in new markets.",
    icon: { public_id: "shield-check", url: "" },
    displayOrder: 6,
    isActive: true,
  },
];

const seedServices = async () => {
  try {
    await connectDB();

    await Service.deleteMany();
    console.log("Existing services deleted");

    await Promise.all(servicesData.map(service => Service.create(service)));
    console.log("Services seeded successfully");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedServices();

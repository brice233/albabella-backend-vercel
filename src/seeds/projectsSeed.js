import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../models/Project.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const projectsData = [
  {
    title: "Eastern Corridor Hub",
    description: "A 50,000 sqm multi-modal logistics terminal facilitating trade between four regional capitals.",
    industry: "Logistics",
    location: "Kigali, Rwanda",
    client: "Ministry of Trade",
    technologies: ["BIM", "Smart Metering", "IoT Monitoring"],
    status: "Completed",
    isActive: true,
  },
  {
    title: "Albabella Plaza",
    description: "Corporate headquarters integrating smart building technology and sustainable energy solutions.",
    industry: "Real Estate",
    location: "Kigali, Rwanda",
    client: "Albabella Group",
    technologies: ["Renewable Integration", "Smart Building", "IoT Monitoring"],
    status: "Completed",
    isActive: true,
  },
  {
    title: "Nyanza Manufacturing Complex",
    description: "State-of-the-art production complex serving domestic and export markets.",
    industry: "Manufacturing",
    location: "Nyanza, Rwanda",
    client: "Nyanza Industrial Park",
    technologies: ["Predictive Maintenance", "Automation", "Quality Control Systems"],
    status: "Completed",
    isActive: true,
  },
  {
    title: "Muhanga Energy Project",
    description: "Distributed power infrastructure supporting industrial parks in the southern province.",
    industry: "Energy",
    location: "Muhanga, Rwanda",
    client: "Rwanda Energy Group",
    technologies: ["Renewable Integration", "Smart Metering", "Grid Management"],
    status: "In Progress",
    isActive: true,
  },
];

const seedProjects = async () => {
  try {
    await connectDB();

    await Project.deleteMany();
    console.log("Existing projects deleted");

    await Promise.all(projectsData.map(project => Project.create(project)));
    console.log("Projects seeded successfully");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProjects();

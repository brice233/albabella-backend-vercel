import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for Seeding...");

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@albabella.com" });

    if (adminExists) {
      console.log("Admin user already exists. Overwriting password to Admin123!...");
      // For demonstration and reset purposes, update the password
      adminExists.password = "Admin123!";
      await adminExists.save();
      console.log("Admin user password reset successfully.");
      process.exit();
    }

    const adminUser = await User.create({
      name: "Super Admin",
      email: "admin@albabella.com",
      password: "Admin123!",
      role: "superadmin",
    });

    console.log("Super Admin user seeded successfully!");
    console.log("Email: admin@albabella.com");
    console.log("Password: Admin123!");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();

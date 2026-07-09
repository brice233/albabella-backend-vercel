import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";

// Initialize express app
const app = express();

// Connect Database
connectDB();

// Global Middleware
app.use(helmet()); // Security headers
app.use(
  cors({
    // origin: process.env.CLIENT_URL || "http://localhost:5173",
    origin: process.env.CLIENT_URL || "https://albabella-frontend.vercel.app",
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression()); // Compress responses
app.use(morgan("dev")); // HTTP request logger

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});
app.use("/api", limiter);

// Basic route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Albabella API is running smoothly." });
});

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

// Generic 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "API Route Not Found" });
});

// Global Error Handler
app.use(errorHandler);

export default app;

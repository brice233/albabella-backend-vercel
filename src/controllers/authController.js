import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
    options.sameSite = "none";
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide an email and password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.isActive) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

// @desc    Register super admin (Initial setup only - should be disabled in production or secured)
// @route   POST /api/auth/register-admin
// @access  Public (temporarily)
export const registerAdmin = asyncHandler(async (req, res, next) => {
  const adminExists = await User.findOne({ role: "superadmin" });
  
  if (adminExists) {
    return res.status(403).json({ success: false, message: "Super admin already exists" });
  }

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role: "superadmin",
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

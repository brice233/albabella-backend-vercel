import asyncHandler from "../utils/asyncHandler.js";
import SiteSettings from "../models/SiteSettings.js";

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res, next) => {
  let settings = await SiteSettings.findOne();

  // If no settings exist, create default
  if (!settings) {
    settings = await SiteSettings.create({});
  }

  res.status(200).json({
    success: true,
    data: settings,
  });
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res, next) => {
  let settings = await SiteSettings.findOne();

  if (!settings) {
    settings = await SiteSettings.create(req.body);
  } else {
    settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });
  }

  res.status(200).json({
    success: true,
    data: settings,
  });
});

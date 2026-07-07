import asyncHandler from "../utils/asyncHandler.js";
import Service from "../models/Service.js";

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = asyncHandler(async (req, res, next) => {
  const services = await Service.find({ isActive: true }).sort("displayOrder");

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

// @desc    Get single service
// @route   GET /api/services/:idOrSlug
// @access  Public
export const getService = asyncHandler(async (req, res, next) => {
  let query;
  
  // Check if idOrSlug is a valid MongoDB ObjectId
  if (req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    query = Service.findById(req.params.idOrSlug);
  } else {
    query = Service.findOne({ slug: req.params.idOrSlug });
  }

  const service = await query;

  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
export const createService = asyncHandler(async (req, res, next) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    data: service,
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }

  // Soft delete
  service.isActive = false;
  await service.save();

  res.status(200).json({
    success: true,
    data: {},
    message: "Service soft-deleted",
  });
});

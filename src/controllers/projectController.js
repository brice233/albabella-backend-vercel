import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/Project.js";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({ isActive: true }).sort("-completionDate");

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// @desc    Get single project
// @route   GET /api/projects/:idOrSlug
// @access  Public
export const getProject = asyncHandler(async (req, res, next) => {
  let query;
  
  if (req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    query = Project.findById(req.params.idOrSlug);
  } else {
    query = Project.findOne({ slug: req.params.idOrSlug });
  }

  const project = await query;

  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res, next) => {
  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project,
  });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  project.isActive = false;
  await project.save();

  res.status(200).json({
    success: true,
    data: {},
    message: "Project soft-deleted",
  });
});

import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/Product.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ isActive: true });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:idOrSlug
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  let query;
  
  if (req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    query = Product.findById(req.params.idOrSlug);
  } else {
    query = Product.findOne({ slug: req.params.idOrSlug });
  }

  const product = await query.populate('relatedServices');

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.idOrSlug);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  product = await Product.findByIdAndUpdate(req.params.idOrSlug, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.idOrSlug);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  product.isActive = false;
  await product.save();

  res.status(200).json({
    success: true,
    data: {},
    message: "Product soft-deleted",
  });
});

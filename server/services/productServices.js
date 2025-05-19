import Product from "../models/productModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

// @desc    Get all Products
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res, next) => {
    // Building query
    const countDocuments = await Product.countDocuments();
    const features = new ApiFeatures(
    Product.find().populate({ path: "category", select: "name -_id" }),
    req.query
  )
    .filter()
    .search(Product)
    .sort()
    .limitFields()
    .paginate(countDocuments);

  // Executing query
  const products = await features.mongooseQuery;

  if (!products || products.length === 0) {
    return next(new ApiError("No products found", 404));
  }
  res.status(200).json({ result: products.length, page: features.page, totalPages: features.totalPages , data: products });
});

// @desc    Get a spesfic Product
// @route   GET /api/v1/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id)
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "subCategory", select: "name -_id" })
    .populate({ path: "brand", select: "name -_id" });
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({ data: product });
});

// @desc    Create a new Product
// @route   POST /api/v1/products
// @access  Private
const createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
  });
});

// @desc    Update a Product
// @route   PATCH /api/v1/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) {
    // res.status(404).json({ message: "Product not found" });
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    message: "Product updated successfully",
    data: product,
  });
});

// @desc    Delete a Product
// @route   DELETE /api/v1/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    // res.status(404).json({ message: "Product not found" });
    return next(new ApiError("Product not found", 404));
  }
  res.status(204).send();
});
export { getProducts, createProduct, getProduct, updateProduct, deleteProduct };

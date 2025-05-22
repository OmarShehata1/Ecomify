import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";
import { uploadSingleImage } from "../middlewares/uploadImageMiddleware.js";

// upload image middleware
const uploadCategoryImage = uploadSingleImage("image");


// resize image middleware
const resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.body.image = `category-${uuidv4()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${req.body.image}`);

  next();
}
);

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = getAll(Category);

// @desc    Get a spesfic category
// @route   GET /api/v1/categories/:id
// @access  Public
const getCategory = getOne(Category);

// @desc    Create a new category
// @route   POST /api/v1/categories
// @access  Private
const createCategory = createOne(Category);

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private
const updateCategory = updateOne(Category);

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private
const deleteCategory = deleteOne(Category);

export {
  uploadCategoryImage,
  resizeImage,
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

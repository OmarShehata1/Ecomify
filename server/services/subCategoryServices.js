import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import subCategory from "../models/subCategoryModel.js";
import { getAll, createOne, getOne,updateOne, deleteOne } from "./handlerFactory.js";


// @desc    Get all SubCategories
// @route   GET /api/v1/subCategories
// @access  Public
const getSubCategories = getAll(subCategory);

// @desc    Get a single subCategory
// @route   GET /api/v1/subCategories/:id
// @access  Public
const getSubCategory = getOne(subCategory)


// @desc    Update a subCategory
// @route   PUT /api/v1/subCategories/:id
// @access  Private
const updateSubCategory = updateOne(subCategory);


// @desc    Create a new subCategory
// @route   POST /api/v1/subCategories
// @access  Private
const createSubCategory = createOne(subCategory);



// @desc    Delete a subCategory
// @route   DELETE /api/v1/subCategories/:id
// @access  Private
const deleteSubCategory = deleteOne(subCategory);



export {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,  
};

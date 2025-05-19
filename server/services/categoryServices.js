import Category from "../models/categoryModel.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js";


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

export { getCategories, createCategory, getCategory, updateCategory, deleteCategory };

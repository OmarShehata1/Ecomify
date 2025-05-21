import Category from "../models/categoryModel.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';


// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/categories');
  },
  // Set the filename
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = `category-${uuidv4()}.${ext}`;
    cb(null, filename);}
});

const upload = multer({ storage: storage });

const uploadCategoryImage = upload.single('image');


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

export {uploadCategoryImage, getCategories, createCategory, getCategory, updateCategory, deleteCategory };

import Category from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const countDocuments = await Category.countDocuments();
     const features = new ApiFeatures(
      Category.find(),
     req.query
   )
     .filter()
     .search()
     .sort()
     .limitFields()
     .paginate(countDocuments);
  
    // Executing query
    const categories = await features.mongooseQuery;
  
  res.status(200).json({ result: categories.length,  page: features.page, totalPages: features.totalPages, data: categories });
});


// @desc    Get a spesfic category
// @route   GET /api/v1/categories/:id
// @access  Public
const getCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
        // res.status(404).json({message :"Category not found"});
        return next(new ApiError("Category not found", 404));
    }
    res.status(200).json({ data: category });
}); 


// @desc    Create a new category
// @route   POST /api/v1/categories
// @access  Private
const createCategory = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const newCategory = await Category.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({
    message: "Category created successfully",
    data: newCategory,
  });
});


// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const category = await Category.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
    );
    if (!category) {
        // res.status(404).json({ message: "Category not found" });
        return next(new ApiError("Category not found", 404));
    }
    res.status(200).json({
        message: "Category updated successfully",
        data: category,
    });
});


// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        // res.status(404).json({ message: "Category not found" });
        return next(new ApiError("Category not found", 404));
    }
    res.status(204).send();
})
export { getCategories, createCategory, getCategory, updateCategory, deleteCategory };

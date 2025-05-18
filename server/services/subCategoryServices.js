import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import subCategory from "../models/subCategoryModel.js";

// @desc    Get all SubCategories
// @route   GET /api/v1/subCategories
// @access  Public
const getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await subCategory
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ result: subCategories.length, page, data: subCategories });
});

// nested Route
// @desc    Get all SubCategories by category
// @route   GET /api/v1/subCategories/category/:categoryId
// @access  Public
const getSubCategoriesByCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const subCategories = await subCategory
    .find({ category: categoryId })
    .populate({ path: "category", select: "name -_id" });
  if (!subCategories || subCategories.length === 0) {
    return next(
      new ApiError(
        `No subCategories found for category with id: ${categoryId}`,
        404
      )
    );
  }
  res.status(200).json({ result: subCategories.length, data: subCategories });
});

// @desc    Get a single subCategory
// @route   GET /api/v1/subCategories/:id
// @access  Public
const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategoryData = await subCategory
    .findById(id)
    .populate({ path: "category", select: "name -_id" });
  if (!subCategoryData) {
    return next(new ApiError(`No subCategory found with this id: ${id}`, 404));
  }
  res.status(200).json({ data: subCategoryData });
});

// @desc    Create a new subCategory
// @route   POST /api/v1/subCategories
// @access  Private
const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const newSubCategory = await subCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({
    message: "SubCategory created successfully",
    data: newSubCategory,
  });
});

// @desc    Create a new subCategory on category creation
// @route   POST /api/v1/categories/:categoryId/subCategories
// @access  Private
const createSubCategoryOnCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { categoryId } = req.params;
  if (!categoryId) {
    return next(new ApiError("Category ID is required", 400));
  }
  if(!req.body.category) {
    req.body.category = categoryId;
  }
  

  const newSubCategory = await subCategory.create({
    name,
    slug: slugify(name),
    category: categoryId,
  });

  res.status(201).json({
    message: "SubCategory created successfully",
    data: newSubCategory,
  });
});


// @desc    Update a subCategory
// @route   PUT /api/v1/subCategories/:id
// @access  Private
const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const updatedSubCategory = await subCategory.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
      category,
    },
    { new: true }
  );

  if (!updatedSubCategory) {
    return next(new ApiError(`No subCategory found with this id: ${id}`, 404));
  }

  res.status(200).json({
    message: "SubCategory updated successfully",
    data: updatedSubCategory,
  });
});


// @desc    Delete a subCategory
// @route   DELETE /api/v1/subCategories/:id
// @access  Private
const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedSubCategory = await subCategory.findByIdAndDelete(id);

  if (!deletedSubCategory) {
    return next(new ApiError(`No subCategory found with this id: ${id}`, 404));
  }

  res.status(204).json({
    message: "SubCategory deleted successfully",
    data: null,
  });
});

export {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  // nested route
  getSubCategoriesByCategory,
  createSubCategoryOnCategory,
};

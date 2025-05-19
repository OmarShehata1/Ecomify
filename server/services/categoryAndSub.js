import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import subCategory from "../models/subCategoryModel.js";

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

// @desc    Create a new subCategory on category creation
// @route   POST /api/v1/categories/:categoryId/subCategories
// @access  Private
const createSubCategoryOnCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { categoryId } = req.params;
  if (!categoryId) {
    return next(new ApiError("Category ID is required", 400));
  }
  if (!req.body.category) {
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

export { getSubCategoriesByCategory, createSubCategoryOnCategory };

import express from "express";

import {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validator/categoryValidator.js";

import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} from "../services/categoryServices.js";
import { getSubCategoriesByCategory, createSubCategoryOnCategory } from "../services/categoryAndSub.js";



const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post( uploadCategoryImage, resizeImage, createCategoryValidator, createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(uploadCategoryImage, resizeImage, updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);


// Nested route for subcategories
  router
  .get("/:categoryId/subcategories", getSubCategoriesByCategory)
  .post("/:categoryId/subcategories", createSubCategoryOnCategory);

export default router;

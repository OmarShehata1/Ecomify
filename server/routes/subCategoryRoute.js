import express from "express";
import {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validator/subCategoryValidator.js";

import {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../services/subCategoryServices.js";

const router = express.Router();

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

router.route("/:id").get(getSubCategoryValidator, getSubCategory)
.put(updateSubCategoryValidator,updateSubCategory )
  .delete(deleteSubCategoryValidator, deleteSubCategory);

export default router;

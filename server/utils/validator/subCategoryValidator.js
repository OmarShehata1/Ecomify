import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validator.js";

const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  validatorMiddleware,
];

const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ min: 2 })
    .withMessage("subCategory name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("subCategory name must be at most 30 characters long"),
  check("category")
    .notEmpty()
    .withMessage("subCategory category is required")
    .isMongoId()
    .withMessage("Invalid category id format"),
  validatorMiddleware,
];

const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ min: 3 })
    .withMessage("subCategory name must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("subCategory name must be at most 30 characters long"),
  validatorMiddleware,
];

const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  validatorMiddleware,
];

export {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
};

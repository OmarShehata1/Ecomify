import { check,body } from "express-validator";
import validatorMiddleware from "../../middlewares/validator.js";
import slugify from "slugify";
const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Category name must be at most 30 characters long"),
  body("name").custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
    validatorMiddleware,
];

const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  body("name").optional().custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];



export {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};

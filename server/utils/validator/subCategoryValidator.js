import { check , body} from "express-validator";
import validatorMiddleware from "../../middlewares/validator.js";
import slugify from "slugify";
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
  body("name").custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
    validatorMiddleware,
];

const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  body("name").custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),validatorMiddleware,
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

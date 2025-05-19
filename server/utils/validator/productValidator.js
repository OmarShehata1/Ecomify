import { check,body } from "express-validator";
import validatorMiddleware from "../../middlewares/validator.js";
import Category from "../../models/categoryModel.js";
import SubCategory from "../../models/subCategoryModel.js";
import slugify from "slugify";
const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters long")
    .isLength({ max: 80 })
    .withMessage("Product title must be at most 80 characters long"),
    body("title").optional().custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
    check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 3 })
    .withMessage("Product description must be at least 3 characters long")
    .isLength({ max: 1000 })
    .withMessage("Product description must be at most 1000 characters long"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (value && value >= req.body.price) {
        throw new Error("Discounted price must be less than regular price");
      }
      return true;
    }),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be an array"),
  check("imageCover")
    .notEmpty()
    .withMessage("Product image cover is required")
    .isString()
    .withMessage("Product image cover must be a string"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be an array"),

  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid category id format")
    .custom(async (CategoryId) => {
      return Category.findById(CategoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error("CategoryId not found"));
        }
      });
    }),

  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid brand id format"),
    
    check("subCategories")
    .notEmpty()
    .withMessage("Product subCategories is required")
    .isArray()
    .withMessage("Product subCategory must be an array")
    .custom(async (subCategoriesIds) => {
      const subCategories = await SubCategory.find({
        _id: { $in: subCategoriesIds },
      });
  
      if (subCategoriesIds.length !== subCategories.length) {
        return Promise.reject(new Error("SubCategoryId not found"));
      }
  
      return true;
    })
    .custom(async (val, { req }) => {
      const subCategories = await SubCategory.find({
        category: req.body.category,
      });
  
      const validSubCategoryIds = subCategories.map((sub) =>
        sub._id.toString()
      );
  
      const isValid = req.body.subCategories.every((id) =>
        validSubCategoryIds.includes(id)
      );
  
      if (!isValid) {
        return Promise.reject(
          new Error("Invalid subCategory for this category")
        );
      }
      return true;
    }),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product ratings average must be a number")
    .isLength({ max: 5 })
    .withMessage("Product ratings average must be at most 5 characters long")
    .isLength({ min: 1 })
    .withMessage("Product ratings average must be at least 1 character long"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product ratings quantity must be a number")
    .isLength({ max: 5 })
    .withMessage("Product ratings quantity must be at most 5 characters long")
    .isLength({ min: 1 })
    .withMessage("Product ratings quantity must be at least 1 character long"),
  validatorMiddleware,
];

const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  body("title").optional().custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];

const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

export {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
};

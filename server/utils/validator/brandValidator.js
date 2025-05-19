import { check ,body} from "express-validator";
import validatorMiddleware from "../../middlewares/validator.js";
import slugify from "slugify";
const getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validatorMiddleware,
];

const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Brand name must be at most 30 characters long"),
    body("name").custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
    validatorMiddleware,
];

const updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
    validatorMiddleware,
];

const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validatorMiddleware,
];



export {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
};

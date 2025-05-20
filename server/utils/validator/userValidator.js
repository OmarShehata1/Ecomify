import { check ,body} from "express-validator";
import validatorMiddleware from "../../middlewares/validator.js";
import slugify from "slugify";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";


const getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isLength({ min: 3 })
    .withMessage("user name must be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("user name must be at most 20 characters long"),
    body("name").custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),

    check("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom( async (value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already Exists"));
        }
      });
    }),

    check("password")
    .notEmpty()
    .withMessage("user password is required")
    .isLength({ min: 6 })
    .withMessage("user password must be at least 6 characters long")
    .isLength({ max: 30 })
    .withMessage("user password must be at most 30 characters long"),
    
    check("passwordConfirm")
    .notEmpty()
    .withMessage("user password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("user password confirmation does not match password");
      }
      return true;
    }),
    
    check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number format"),
    check("role")
    .optional(),

    validatorMiddleware,
];

const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
    validatorMiddleware,
];

const deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];


const changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  check("currentPassword")
    .notEmpty()
    .withMessage("user password is required")
    .isLength({ min: 6 })
    .withMessage("user password must be at most 30 characters long"),
    check("passwordConfirm")
    .notEmpty()
    .withMessage("user password confirmation is required"),
    check("password")
    .notEmpty()
    .withMessage("user password is required")
    .custom(async (value, { req }) => {
        const user = await User.findById(req.params.id);
        if (!user) {
          return Promise.reject(new Error("user not found"));
        }
        const isMatch = await bcrypt.compareSync(req.body.currentPassword, user.password);
        if (!isMatch) {
          return Promise.reject(new Error("user password is incorrect"));
        }
        if (value !== req.body.passwordConfirm) {
          return Promise.reject(new Error("user password confirmation does not match password"));
        }
      return true;
    }),
    validatorMiddleware,
];


export {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
};

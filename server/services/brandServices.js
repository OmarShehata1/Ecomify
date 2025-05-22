import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js";
import { uploadSingleImage } from "../middlewares/uploadImageMiddleware.js";


// upload image middleware
const uploadBrandImage = uploadSingleImage("image");


// resize image middleware
const resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.body.image = `brand-${uuidv4()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${req.body.image}`);

  next();
}
);


// @desc    Get all Brands
// @route   GET /api/v1/brands
// @access  Public
const getBrands = getAll(Brand);


// @desc    Get a spesfic brand
// @route   GET /api/v1/brands/:id
// @access  Public
const getBrand = getOne(Brand);


// @desc    Create a new Brand
// @route   POST /api/v1/brands
// @access  Private
const createBrand = createOne(Brand);


// @desc    Update Brand
// @route   PUT /api/v1/brands/:id
// @access  Private
const updateBrand = updateOne(Brand);


// @desc    Delete Brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
const deleteBrand = deleteOne(Brand);


export { uploadBrandImage, resizeImage ,getBrands, getBrand , createBrand, updateBrand, deleteBrand };

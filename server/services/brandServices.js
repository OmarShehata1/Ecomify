import Brand from "../models/brandModel.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js";

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


export { getBrands, getBrand , createBrand, updateBrand, deleteBrand };

import Product from "../models/productModel.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js";


// @desc    Get all Products
// @route   GET /api/v1/products
// @access  Public
const getProducts = getAll(Product, "Product");

// @desc    Get a spesfic Product
// @route   GET /api/v1/products/:id
// @access  Public
const getProduct = getOne(Product);

// @desc    Create a new Product
// @route   POST /api/v1/products
// @access  Private
const createProduct = createOne(Product);

// @desc    Update a Product
// @route   PATCH /api/v1/products/:id
// @access  Private
const updateProduct = updateOne(Product);

// @desc    Delete a Product
// @route   DELETE /api/v1/products/:id
// @access  Private
const deleteProduct = deleteOne(Product);
export { getProducts, createProduct, getProduct, updateProduct, deleteProduct };

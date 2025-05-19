import Brand from "../models/brandModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

// @desc    Get all Brands
// @route   GET /api/v1/brands
// @access  Public

const getBrands = asyncHandler(async (req, res) => {
   // Building query
   const countDocuments = await Brand.countDocuments();
   const features = new ApiFeatures(
   Brand.find(),
   req.query
 )
   .filter()
   .search()
   .sort()
   .limitFields()
   .paginate(countDocuments);

  // Executing query
  const brands = await features.mongooseQuery;

  res.status(200).json({ result: brands.length, page: features.page, totalPages: features.totalPages , data: brands });
});


// @desc    Get a spesfic brand
// @route   GET /api/v1/brands/:id

// @access  Public
const getBrand = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const brand = await Brand.findById(id);
    if (!brand) {
        // res.status(404).json({message :"Category not found"});
        return next(new ApiError("brand not found", 404));
    }
    res.status(200).json({ data: brand });
}); 


// @desc    Create a new Brand
// @route   POST /api/v1/brands
// @access  Private
const createBrand = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const newBrand = await Brand.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({
    message: "Brand created successfully",
    data: newBrand,
  });
});


// @desc    Update Brand

// @route   PUT /api/v1/brands/:id
// @access  Private
const updateBrand = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const brand = await Brand.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
    );
    if (!brand) {
        // res.status(404).json({ message: "Category not found" });
        return next(new ApiError("Brand not found", 404));
    }
    res.status(200).json({
        message: "Brand updated successfully",
        data: brand,
    });
});


// @desc    Delete Brand

// @route   DELETE /api/v1/brands/:id
// @access  Private
const deleteBrand = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
        // res.status(404).json({ message: "Category not found" });
        return next(new ApiError("Brand not found", 404));
    }
    res.status(204).send();
})
export { getBrands, getBrand , createBrand, updateBrand, deleteBrand };

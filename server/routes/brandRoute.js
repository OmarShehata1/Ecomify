import express from "express";
import {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validator/brandValidator.js";

import {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} from "../services/brandServices.js";

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post( uploadBrandImage,
    resizeImage,createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put( uploadBrandImage,
    resizeImage, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
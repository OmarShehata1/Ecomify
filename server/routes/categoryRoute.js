import express from "express";

import {
  getCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory,
} from "../services/categoryServices.js";

const router = express.Router();

router.route("/").get(getCategories)

// router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router;

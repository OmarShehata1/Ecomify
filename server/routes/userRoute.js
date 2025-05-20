import express from "express";

import {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} from "../utils/validator/userValidator.js";


import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
    changeUserPassword,
} from "../services/userServices.js";

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(createUserValidator, createUser);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
router
  .route("/changePassword/:id")
  .put(changeUserPasswordValidator, changeUserPassword);

export default router;
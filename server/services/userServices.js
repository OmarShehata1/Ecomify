import User from "../models/userModel.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
const getUsers = getAll(User);


// @desc    Get a spesfic user
// @route   GET /api/v1/users/:id
// @access  Public
const getUser = getOne(User);


// @desc    Create a new user
// @route   POST /api/v1/users
// @access  Private
const createUser = createOne(User);


// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private
const updateUser =  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        profileImage: req.body.profileImage,
        phone: req.body.phone,
        role: req.body.role,
    }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new ApiError(`No User found with this id: ${id}`, 404));
    }
    res.status(200).json({ status: "success", data: user });

});

const changeUserPassword = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {
        password: await bcrypt.hash(req.body.password,10),
    }, {
      new: true,
})
    if (!user) {
      return next(new ApiError(`No User found with this id: ${id}`, 404));
    }
    res.status(200).json({ status: "success", data: user });
})


// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private
const deleteUser = deleteOne(User);


export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    changeUserPassword,
};
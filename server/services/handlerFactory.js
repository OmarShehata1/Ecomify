import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";



const getAll = (Model, modelName='') =>
  asyncHandler(async (req, res) => {
    // Building query
    const countDocuments = await Model.countDocuments();
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .search(modelName)
      .sort()
      .limitFields()
      .paginate(countDocuments);

    // Executing query
    const docs = await features.mongooseQuery;

    res.status(200).json({
      result: docs.length,
      page: features.page,
      totalPages: features.totalPages,
      data: docs,
    });
});



const getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let query = Model.findById(id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const doc = await query;
    if (!doc) {
      return next(new ApiError(`No document found with this id: ${id}`, 404));
    }
    res.status(200).json({ status: "success", data: doc });
});



const updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
      const id = req.params.id;
      const doc = await Model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        return next(new ApiError(`No document found with this id: ${id}`, 404));
      }
      res.status(200).json({ status: "success", data: doc });
  
});


const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ status: "success", data: doc });
});


const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new ApiError(`No document found with this id: ${id}`, 404));
    }
    res.status(204).json({ status: "success", data: null });
});


export { getAll, getOne, createOne, updateOne, deleteOne };

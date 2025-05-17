import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "SubCategory name is required"],
    trim: true,
    unique: [true, "SubCategory must be unique" ],
    minLength: [2, "SubCategory name must be at least 2 characters"],
    maxLength: [32, "SubCategory name must be at most 32 characters"],
    },
    slug: {
    type: String,
    lowercase: true,
    unique: true,
    },
    category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "SubCategory must belong to a category"],
    },
}, {
  timestamps: true,
});


const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: [true,"Category name must be unique"],
        trim: true,
        minLength: [3, "Category name must be at least 3 characters"],
        maxLength: [30, "Category name must be at most 50 characters"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image : String,
}, { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minLength: [3, "Product title must be at least 3 characters"],
      maxLength: [80, "Product title must be at most 80 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: [true, "Product slug is required"],
    },
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    images: {
      type: [String],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      maxLength: [5, "Price must be at most 5 characters"],
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
      maxLength: [5, "Price after discount must be at most 5 characters"],
      default: 0,
    },
    colors: {
      type: [String],
    },
    sold: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [20, "Description must be at least 3 characters"],
      maxLength: [1000, "Description must be at most 1000 characters"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    subCategories: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubCategory",
        },
      ],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, "Rating must be above or equal to 1.0"],
      max: [5, "Rating must be below or equal to 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// mongoose middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path : "category",
    select: "name -_id",
  }).populate({
    path: "subCategories",
    select: "name -_id",
  })
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;

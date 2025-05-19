import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoute.js";
import subCategoryRoutes from "./routes/subCategoryRoute.js";
import brandRoutes from "./routes/brandRoute.js";
import productRoutes from "./routes/productRoute.js";
import globalError from "./middlewares/errorHandler.js";
import ApiError from "./utils/apiError.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  console.log(` mode: ${process.env.NODE_ENV}`);
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/subCategories", subCategoryRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/products", productRoutes);

app.use((req, res, next) => {
  next(new ApiError(`Can't find this route `, 400));
});

//Global Error handling middleware
app.use(globalError);



connectDB();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on Port : ${PORT}`);
});


// Handle unhandled promise rejections ( output express )
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  server.close(() => {
    console.log("💥 Shutting down server due to Unhandled Rejection");
    process.exit(1);
  });
});

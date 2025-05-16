import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoute.js";


dotenv.config();
const app = express();


if (process.env.NODE_ENV === "development") {
    console.log(` mode: ${process.env.NODE_ENV}`);
    app.use(morgan("dev"));
}


// Middleware
app.use(express.json());




// Routes
app.use("/api/v1/categories", categoryRoutes);



connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on Port : ${PORT}`);
});

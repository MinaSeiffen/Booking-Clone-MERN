import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./Routes/users";
import authRoutes from "./Routes/auth";
import hotelRoutes from "./Routes/my-hotels"
import cookieParser from "cookie-parser";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", hotelRoutes);

app.use("*", (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.listen(7000, () => {
  console.log("Server is running at port 7000");
});

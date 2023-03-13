import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cores from "cors";
import adminRouter from "./routrs/admin.js";
import loginRouter from "./routrs/login.js";
import signupRouter from "./routrs/signup.js";
import cardRouter from "./routrs/user.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(
  cores({
    origin: ["https://muchsite-mern-app-yl4a.onrender.com/"],
  })
);
const connect = async (req, res, next) => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.mongoDB);
    console.log("Connected to mongoDB");
  } catch (error) {
    return next(error);
  }
};

app.use("/user", adminRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/card", cardRouter);
app.use((err, req, res, next) => {
  const errMSG = err.message || "Something went wrong!";
  const errStatus = err.status || 500;
  return res.status(errStatus).json({
    message: errMSG,
    success: false,
    stack: err.stack,
  });
});
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  connect();
  console.log("app is listening");
});

import UserSchema from "../schema/UserSchema.js";
import { createError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
export const loginAdmin = async (req, res, next) => {
  try {
    await res.send("admin");
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    if (!user) return next(createError(401, "User not found"));
    const isPassword = await user.compearPasswords(req.body.password);
    if (!isPassword) return next(createError(401, "Incorrect password"));
    const token = user.createJwt();
    res.status(200).json({ token, email: user.email, id: user._id });
  } catch (error) {
    next(error);
  }
};

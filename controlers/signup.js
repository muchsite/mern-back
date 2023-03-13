import bcrypt from "bcrypt";
import Card from "../schema/Card.js";
import UserSchema from "../schema/UserSchema.js";
import { createError } from "../utils/errorHandler.js";

export const signUser = async (req, res, next) => {
  const { password, password2, email } = req.body;
  if (password.length < 6) {
    return next(
      createError(400, "Password must be at least 6 characters long")
    );
  }
  if (password !== password2) {
    return next(createError(400, "Passwords do not match"));
  }
  try {
    const saveUser = await UserSchema.create({ email, password });
    const createCard = await Card.create({
      createdBy: saveUser._id,
      items: [],
    });
    const token = saveUser.createJwt();
    res.status(200).json({ name: saveUser.email, token, id: saveUser._id });
  } catch (error) {
    next(error);
  }
};

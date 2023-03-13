import { createError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(createError(401, "You are not authenticed1"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userID, userEmail: payload.mail };
    next();
  } catch (error) {
    next(createError(400, "You are not authirised2"));
  }
};

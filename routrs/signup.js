import express from "express";
import { signUser } from "../controlers/signup.js";

const router = express.Router();

router.post("/user", signUser);

export default router;

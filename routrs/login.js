import express from "express";
import { loginAdmin, loginUser } from "../controlers/login.js";

const router = express.Router();

router.post("/admin", loginAdmin);
router.post("/user", loginUser);

export default router;

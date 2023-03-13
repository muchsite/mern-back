import express from "express";
import {
  addItem,
  deleteItem,
  editItem,
  getAllItems,
  getItem,
  getItemByCategory,
  getItemByName,
  getByPrice,
} from "../controlers/admin.js";
import { auth } from "../middlewears/auth.js";
const router = express.Router();

router.post("/", addItem);
router.patch("/:id", editItem);
router.get("/", getAllItems);
router.get("/:id", getItem);
router.get("/name/:name", getItemByName);
router.get("/category/id", getItemByCategory);
router.get("/price/id", getByPrice);
router.delete("/:id", deleteItem);

export default router;

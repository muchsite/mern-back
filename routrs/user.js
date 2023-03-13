import express from "express";
import {
  addItemCard,
  getCard,
  addAmountCard,
  deleteItemCard,
} from "../controlers/card.js";
import { auth } from "../middlewears/auth.js";

const router = express.Router();
///card/
router.post("/additem", auth, addItemCard);
router.post("/addamount", auth, addAmountCard);
router.post("/delete", auth, deleteItemCard);
router.post("/getcard", auth, getCard);

export default router;

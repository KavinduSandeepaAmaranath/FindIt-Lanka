import express from "express";
import {
  getMatchesForLostItem,
  getMatchesForFoundItem,
} from "../controllers/matchingController.js";

const router = express.Router();

router.get("/lost/:id", getMatchesForLostItem);
router.get("/found/:id", getMatchesForFoundItem);

export default router;

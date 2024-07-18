import express from "express";
import {
  createState,
  getStates,
  updateState,
  deleteState,
} from "../controllers/stateController";

import { isAuthenticated } from "../middleware/auth";

import { validateState } from "../utils/validate";

const router = express.Router();

router.post("/create", isAuthenticated, validateState, createState);
router.get("/get", isAuthenticated, getStates);
router.put("/update/:id", isAuthenticated, validateState, updateState);
router.delete("/delete/:id", isAuthenticated, deleteState);

export default router;

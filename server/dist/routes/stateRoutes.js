"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stateController_1 = require("../controllers/stateController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../utils/validate");
const router = express_1.default.Router();
router.post("/create", auth_1.isAuthenticated, validate_1.validateState, stateController_1.createState);
router.get("/get", auth_1.isAuthenticated, stateController_1.getStates);
router.put("/update/:id", auth_1.isAuthenticated, validate_1.validateState, stateController_1.updateState);
router.delete("/delete/:id", auth_1.isAuthenticated, stateController_1.deleteState);
exports.default = router;

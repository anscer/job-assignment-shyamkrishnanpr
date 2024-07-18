"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateState = void 0;
const express_validator_1 = require("express-validator");
exports.validateState = [
    (0, express_validator_1.body)("status")
        .exists()
        .withMessage("Status is required")
        .isString()
        .withMessage("Status must be a string")
        .trim(),
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .trim(),
    (0, express_validator_1.body)("description")
        .exists()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string")
        .trim(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

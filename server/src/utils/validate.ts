import { body, validationResult } from "express-validator";

export const validateState = [
  body("status")
    .exists()
    .withMessage("Status is required")
    .isString()
    .withMessage("Status must be a string")
    .trim(),
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim(),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

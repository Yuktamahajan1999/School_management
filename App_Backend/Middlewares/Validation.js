import { body } from 'express-validator';

export const schoolValidation = [
  body('name')
    .notEmpty().withMessage("School name is required")
    .isLength({ min: 3, max: 100 }).withMessage("School name should be 3-100 characters long"),

  body('address')
    .optional()
    .isLength({ min: 5, max: 200 }).withMessage("Address should be 5-200 characters long"),

  body('city')
    .notEmpty().withMessage("City is required")
    .isLength({ min: 2, max: 50 }).withMessage("City should be 2-50 characters long"),

  body('state')
    .notEmpty().withMessage("State is required")
    .isLength({ min: 2, max: 50 }).withMessage("State should be 2-50 characters long"),

  body('contact')
    .notEmpty()
    .isMobilePhone('en-IN').withMessage("Enter a valid Indian mobile number")
    .isLength({ min: 10, max: 10 }).withMessage("Phone number must be 10 digits"),

  body('email_id')
    .notEmpty()
    .isEmail().withMessage("Enter a valid email address"),
];
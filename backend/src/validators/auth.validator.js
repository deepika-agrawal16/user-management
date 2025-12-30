import { body } from "express-validator";

export const signupValidator = [
  body("fullName")
  .notEmpty()
  .withMessage("Full name is required"),

  body("email")
  .isEmail()
  .withMessage("Invalid email format"),

  body("password")
  .isLength({min: 8})
  .withMessage("Password must be atleast 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must contain one uppercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain one number")

];
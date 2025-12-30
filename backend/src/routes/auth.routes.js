import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { signupValidator } from "../validators/auth.validator.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/signup", signupValidator,  (req, res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  signup(req,res,next);
});

router.post("/login", 
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
   (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    login(req, res, next);
  }
);

export default router;
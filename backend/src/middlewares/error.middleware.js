import { validationResult
 } from "express-validator";

 const errorHandler = (err,req, res, next) => {
  if(err.errors) {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }

   res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
 };

 export default errorHandler;

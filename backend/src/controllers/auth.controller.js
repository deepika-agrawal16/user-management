import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req,res,next) => {
  try {
    const {fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id, role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  }catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password} = req.body;

    const user = await User.findOne({
      email
    }).select("+password");

    if(!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (user.status === "inactive") {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};

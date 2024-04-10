import express, { Request, Response } from "express";
import UserModel from "../Models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../Middleware/auth";

const router = express.Router();

router.get("/me" , verifyToken , async(req: Request, res: Response)=>{
  const userID = req.userId;
  try {
    const user = await UserModel.findById(userID).select("-password")

    if(!user){
      res.status(404).json({ message: "user not found"});
    }
    
    res.status(200).json(user)
    
  } catch (error) {
    res.status(500).json({message: "failed to get user data"})
  }
})

router.post(
  "/register",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({
      min: 6,
    }),
    check("firstName", "firstName is required").isString(),
    check("lastName", "lastName is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()});
    }
    try {
      let user = await UserModel.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ MSG: "user already registered" });
      }
      user = new UserModel(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).json({message: "User registered"});
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({ message: "Registration failed", error: error });
    }
  }
);

export default router;

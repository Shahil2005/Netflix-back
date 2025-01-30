import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    // Validate inputs
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }
    
    // Check for existing users
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Assign random profile picture
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Create user
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    // Save user
    await newUser.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(newUser.id, res);

    // Respond to client
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error("Error in signup function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export async function logout(req, res) {
    try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({success: true, message: "Logged out successfully"});
    }catch(error){
         console.error("Error in logout controller:", error/message);
         res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  
  export async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      // Check if password is correct
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      generateTokenAndSetCookie(user.id, res);
  
      return res.status(200).json({
        success: true,
        user: {
          ...user._doc,
          password: "", // Exclude password from response
        },
      });
    } catch (error) {
      console.error("Error in login controller:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  export async function authCheck(req, res) {
    try {
      console.log("req.user", req.user);
      res.status(200).json({ success: true, user: req.user });
    } catch (error) {
      console.log("Error in authCheck controller:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  
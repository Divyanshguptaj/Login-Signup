import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// @desc    User Signup
// @route   POST /api/v1/auth/signup
// @access  Public
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    // Let model pre-save hook hash the password

    // Generate a random avatar
    // Generate a random avatar using the user's email as a seed for a unique design
    // Generate a random avatar using the 'adventurer' style
    const avatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${email}`;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
      avatar,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    User Login
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Manually refetch user to include avatar (since it's not selected by default)
    const userWithAvatar = await User.findById(user._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: userWithAvatar._id,
        name: userWithAvatar.name,
        email: userWithAvatar.email,
        role: userWithAvatar.role,
        avatar: userWithAvatar.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current User Profile
// @route   GET /api/v1/auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

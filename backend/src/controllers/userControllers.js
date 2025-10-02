import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @desc    Get all users (admin only)
// @route   GET /api/v1/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID (admin or self)
// @route   GET /api/v1/users/:id
// @access  Private
export const getUserById = async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this user" });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile (self only)
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user (admin only)
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

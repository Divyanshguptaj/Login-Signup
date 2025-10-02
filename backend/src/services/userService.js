import User from "../models/User.js";

export const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUser = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) throw new Error("User not found");
  return updatedUser;
};

export const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw new Error("User not found");
  return deletedUser;
};

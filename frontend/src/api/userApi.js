import axiosInstance from "./axiosInstance";

// Get all users (admin)
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

// Get single user
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

// Update user profile
export const updateProfile = async (userData) => {
  const response = await axiosInstance.put("/users/profile", userData);
  return response.data;
};

// Delete user (admin)
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};

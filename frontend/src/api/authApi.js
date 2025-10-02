import axiosInstance from "./axiosInstance";

// Signup
export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

// Login
export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

// Get current user profile
export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

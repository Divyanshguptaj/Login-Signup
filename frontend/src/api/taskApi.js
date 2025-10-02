import axiosInstance from "./axiosInstance";

// Create a task
export const createTask = async (taskData) => {
  const response = await axiosInstance.post("/tasks", taskData);
  return response.data;
};

// Get all tasks
export const getTasks = async (params = {}) => {
  const response = await axiosInstance.get("/tasks", { params });
  return response.data;
};

// Get single task
export const getTaskById = async (id) => {
  const response = await axiosInstance.get(`/tasks/${id}`);
  return response.data;
};

// Update a task
export const updateTask = async (id, taskData) => {
  const response = await axiosInstance.put(`/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};

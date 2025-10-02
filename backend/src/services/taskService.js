import Task from "../models/Task.js";

export const createTask = async (taskData, userId) => {
  const task = await Task.create({ ...taskData, createdBy: userId });
  return task;
};

export const getAllTasks = async () => {
  const tasks = await Task.find()
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email");
  return tasks;
};

export const getTaskById = async (id) => {
  const task = await Task.findById(id)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email");

  if (!task) throw new Error("Task not found");
  return task;
};

export const updateTask = async (id, data) => {
  const task = await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!task) throw new Error("Task not found");
  return task;
};

export const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw new Error("Task not found");
  return task;
};

export const getUserTasks = async (userId) => {
  const tasks = await Task.find({ createdBy: userId }).populate("assignedTo", "name email");
  return tasks;
};

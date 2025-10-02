import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import { ClipboardCheck, Plus, Trash2, Loader, Check } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setLoading(true);
    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task._id, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ClipboardCheck className="w-8 h-8" />
            Task Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Stay organized and keep track of your to-dos.</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        {/* Add Task Form */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleCreate} className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-[85%] px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              <span>{loading ? "Adding..." : "Add Task"}</span>
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className={`p-6 flex items-center justify-between transition-colors ${task.completed ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'}`}>
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                  </button>
                  <div>
                    <p className={`font-medium text-gray-900 dark:text-white ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className={`text-sm text-gray-500 dark:text-gray-400 ${task.completed ? 'line-through' : ''}`}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Delete Task"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                <ClipboardCheck className="w-12 h-12" />
                <h3 className="text-lg font-semibold">No Tasks Yet</h3>
                <p className="text-sm">Get started by adding a new task above.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

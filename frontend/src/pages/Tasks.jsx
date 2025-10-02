import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import Input from "../components/Input";
import Button from "../components/Button";

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
    if (!newTask.title) return;
    setLoading(true);
    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Tasks</h2>
        <p className="text-slate-600 mt-1">Create, view and manage your tasks.</p>
      </div>

      <form className="mb-6 flex gap-2" onSubmit={handleCreate}>
        <Input
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Task"}</Button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
            <div>
              <p className="font-medium text-slate-800">{task.title}</p>
              {task.description && <p className="text-sm text-slate-600">{task.description}</p>}
            </div>
            <Button onClick={() => handleDelete(task._id)} className="bg-red-500 hover:bg-red-600">Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

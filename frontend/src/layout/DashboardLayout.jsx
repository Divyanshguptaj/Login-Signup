import React from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-800">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white/70 dark:bg-slate-900 backdrop-blur hidden md:flex flex-col p-4 border-r border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
            <Link to="/dashboard" className="hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded">
              Home
            </Link>
            <Link to="/dashboard/profile" className="hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded">
              Profile
            </Link>
            <Link to="/dashboard/tasks" className="hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded">
              Tasks
            </Link>
            {user?.role === "admin" && (
              <Link to="/dashboard/admin" className="hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded text-red-600 font-medium">
                Admin
              </Link>
            )}
          </nav>
          <div className="mt-auto pt-4">
            <button onClick={handleLogout} className="w-full px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto text-slate-900 dark:text-slate-100">
          {/* Outlet renders nested routes */}
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

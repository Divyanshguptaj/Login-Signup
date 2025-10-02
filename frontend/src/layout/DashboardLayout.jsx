import React from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white/70 backdrop-blur border-r hidden md:flex flex-col p-4">
          <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
            <Link to="/dashboard" className={`p-2 rounded ${pathname === "/dashboard" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}>
              Home
            </Link>
            <Link to="/dashboard/profile" className={`p-2 rounded ${pathname.startsWith("/dashboard/profile") ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}>
              Profile
            </Link>
            <Link to="/dashboard/tasks" className={`p-2 rounded ${pathname.startsWith("/dashboard/tasks") ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}>
              Tasks
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
          {/* Outlet renders nested routes */}
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

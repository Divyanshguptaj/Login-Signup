import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from 'lucide-react';
import useOutsideClick from "../hooks/useOutsideClick";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setOpen(false));
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b dark:border-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center text-lg">🔒</div>
          <div className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            <Link to="/dashboard">MyApp</Link>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full border bg-white dark:bg-slate-800 dark:border-slate-700 px-2 py-1.5 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                {
                  user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white grid place-items-center">
                      {(user.name || "U").slice(0,1).toUpperCase()}
                    </div>
                  )
                }
                <span className="hidden sm:block text-sm font-medium">{user.name || user.username}</span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white dark:bg-slate-800 dark:border-slate-700 shadow-lg">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { setOpen(false); handleLogout(); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/signup" className="hover:text-blue-600">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

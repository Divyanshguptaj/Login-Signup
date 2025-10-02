import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center text-lg">🔒</div>
          <div className="text-xl font-semibold text-slate-800">
            <Link to="/dashboard">MyApp</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-700">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50"
              >
                <span className="hidden sm:inline">{user.name || user.username}</span>
                <span className="sm:hidden">Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-md overflow-hidden">
                  <Link to="/dashboard/profile" className="block px-3 py-2 text-sm hover:bg-slate-50" onClick={() => setMenuOpen(false)}>Profile</Link>
                  <button className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50" onClick={() => { setMenuOpen(false); setConfirmOpen(true); }}>Logout</button>
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
      <Modal
        open={confirmOpen}
        title="Logout"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); handleLogout(); }}
        confirmText="Logout"
      >
        Are you sure you want to logout?
      </Modal>
    </nav>
  );
};

export default Navbar;

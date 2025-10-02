import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertTriangle, Loader } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layout/AuthLayout";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    "Secure authentication with JWT",
    "Clean, responsive UI",
    "Fast task management experience",
  ];

  const form = (
    <form
      className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8"
      onSubmit={handleSubmit}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Sign In</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Please enter your credentials to continue.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl border bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2"
      >
        {loading && <Loader className="w-5 h-5 animate-spin" />}
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
          Sign up
        </Link>
      </p>
    </form>
  );

  return (
    <AuthLayout 
      title="Welcome Back"
      subtitle="Login to access your dashboard and manage tasks seamlessly."
      highlights={highlights}
      form={form}
      image="🔐"
    />
  );
};

export default Login;

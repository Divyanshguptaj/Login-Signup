import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

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

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="hidden md:flex flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white shadow-sm grid place-items-center text-blue-600 text-xl">🔐</div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          </div>
          <p className="mt-4 text-slate-600 max-w-md">
            Login to access your dashboard and manage tasks seamlessly.
          </p>
        </div>
        <div className="relative z-10 mt-10">
          <div className="rounded-2xl border bg-white/60 backdrop-blur p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Highlights</h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>Secure authentication with JWT</li>
              <li>Clean, responsive UI</li>
              <li>Fast task management experience</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10">
        <form
          className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-6 md:p-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">Sign in</h2>
            <p className="text-slate-500 mt-1">Please enter your credentials</p>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="mt-6 w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      await signup(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="hidden md:flex flex-col justify-between p-10 relative overflow-hidden order-2 md:order-1">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-sky-400/20 to-fuchsia-500/20 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white shadow-sm grid place-items-center text-emerald-600 text-xl">✨</div>
            <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
          </div>
          <p className="mt-4 text-slate-600 max-w-md">
            Join and start organizing your tasks with a delightful experience.
          </p>
        </div>
        <div className="relative z-10 mt-10">
          <div className="rounded-2xl border bg-white/60 backdrop-blur p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">You’ll get</h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>Clean dashboard</li>
              <li>Secure authentication</li>
              <li>Quick task management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10 order-1 md:order-2">
        <form
          className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-6 md:p-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">Sign up</h2>
            <p className="text-slate-500 mt-1">Create a new account</p>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
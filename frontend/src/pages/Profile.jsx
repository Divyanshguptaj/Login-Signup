import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { getProfile } from "../api/authApi";
import { updateProfile } from "../api/userApi";

const Profile = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setFormData({ name: data.name, email: data.email });
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await updateProfile(formData);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Profile</h2>
        <p className="text-slate-600 mt-1">Manage your personal information.</p>
      </div>
      {message && (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-xl shadow-sm border">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} required />
        <Button type="submit" disabled={loading} className="w-full mt-2">{loading ? "Updating..." : "Update Profile"}</Button>
      </form>
    </div>
  );
};

export default Profile;

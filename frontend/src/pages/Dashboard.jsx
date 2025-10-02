import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../api/authApi";

const DashboardHome = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setProfile(profile);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 dark:border dark:border-slate-700">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {profile?.name ? `Welcome back, ${profile.name}!` : "Welcome to your Dashboard"}
          </h1>
          <p className="mt-2 text-white/90 max-w-2xl">
            Manage your profile and tasks with a clean, fast experience.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/dashboard/tasks" className="inline-flex items-center gap-2 rounded-lg bg-white/95 text-slate-900 px-4 py-2 font-medium shadow-sm hover:bg-white">
              🗒️ Go to Tasks
            </Link>
            <Link to="/dashboard/profile" className="inline-flex items-center gap-2 rounded-lg bg-white/20 text-white px-4 py-2 font-medium ring-1 ring-inset ring-white/40 hover:bg-white/25">
              ✏️ Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      {profile && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-5 shadow-sm">
            <p className="text-slate-500 text-sm">Name</p>
            <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">{profile.name}</p>
          </div>
          <div className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-5 shadow-sm">
            <p className="text-slate-500 text-sm">Email</p>
            <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100 break-all">{profile.email}</p>
          </div>
          <div className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-5 shadow-sm">
            <p className="text-slate-500 text-sm">Role</p>
            <p className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {profile.role}
            </p>
          </div>
        </div>
      )}

      {/* Quick tips / empty state */}
      <div className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Quick tips</h3>
        <ul className="mt-3 list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1 text-sm">
          <li>Use the sidebar to navigate between Profile and Tasks.</li>
          <li>Click your avatar on the top-right for quick Profile and Logout.</li>
          <li>Tasks page lets you add and delete items instantly.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;

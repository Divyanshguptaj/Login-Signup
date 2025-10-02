import React, { useEffect, useState } from "react";
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
    <div className="">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Welcome to your Dashboard</h1>
        <p className="text-slate-600 mt-1">Here’s a quick look at your profile.</p>
      </div>
      {profile && (
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-500 text-sm">Name</p>
              <p className="font-medium text-slate-800">{profile.name}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Email</p>
              <p className="font-medium text-slate-800">{profile.email}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Role</p>
              <p className="font-medium text-slate-800">{profile.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;

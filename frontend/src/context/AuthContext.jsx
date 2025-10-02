import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginAPI, signup as signupAPI, getProfile as getProfileAPI } from "../api/authApi";

// Create context
const AuthContext = createContext();

// Hook to use context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const profile = await getProfileAPI();
          setUser(profile);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Login function
  const login = async (credentials) => {
    const result = await loginAPI(credentials);
    localStorage.setItem("token", result.token);
    setUser(result.user);
    return result.user;
  };

  // Signup function
  const signup = async (userData) => {
    const result = await signupAPI(userData);
    localStorage.setItem("token", result.token);
    setUser(result.user);
    return result.user;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

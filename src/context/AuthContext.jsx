import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

// Add request interceptor to include Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from localStorage on mount
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("accessToken");
    if (storedEmail && storedRole && storedToken) {
      setUser({ email: storedEmail, role: storedRole });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { accessToken, mustChangePassword: mustChange } = response.data;
      
      // Decode token to get email and role
      const decoded = JSON.parse(atob(accessToken.split(".")[1]));
      
      // Store token, email and role in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("email", decoded.email);
      localStorage.setItem("role", decoded.role);
      
      setUser({ email: decoded.email, role: decoded.role });
      setMustChangePassword(mustChange || false);
      
      return { success: true, mustChangePassword: mustChange || false };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Invalid credentials";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setUser(null);
    setMustChangePassword(false);
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await axios.post(
        "/api/auth/change-password",
        { oldPassword, newPassword },
      );
      setMustChangePassword(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to change password";
      throw new Error(errorMessage);
    }
  };

  const value = {
    user,
    mustChangePassword,
    login,
    logout,
    changePassword,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

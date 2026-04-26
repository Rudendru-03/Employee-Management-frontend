import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../lib/apiClient";

const AuthContext = createContext();

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
      const response = await apiClient.post("/auth/login", { email, password });
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

  const clearSession = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setUser(null);
    setMustChangePassword(false);
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      clearSession();
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await apiClient.post("/auth/change-password", {
        currentPassword: oldPassword,
        newPassword,
      });
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

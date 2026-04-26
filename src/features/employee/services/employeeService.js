import apiClient from "../../../lib/apiClient";

const getPaginatedData = (response) => ({
  data: response.data?.data || [],
  pagination: response.data?.pagination || {
    total: 0,
    limit: 10,
    offset: 0,
    hasNext: false,
    hasPrev: false,
  },
});

export const employeeService = {
  // Get employee profile
  getProfile: async () => {
    try {
      const response = await apiClient.get("/employee/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update employee profile
  updateProfile: async (updates) => {
    try {
      const response = await apiClient.patch("/employee/me", updates);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload profile photo
  uploadPhoto: async (photoUrl) => {
    try {
      const response = await apiClient.post("/employee/me/photo", { photoUrl });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMyAttendance: async (params = {}) => {
    try {
      const response = await apiClient.get("/attendance/me", { params });
      return getPaginatedData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMyLeaves: async (params = {}) => {
    try {
      const response = await apiClient.get("/leaves/me", { params });
      return getPaginatedData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  applyLeave: async (data) => {
    try {
      const response = await apiClient.post("/leaves", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

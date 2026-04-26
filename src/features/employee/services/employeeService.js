import apiClient from "../../../lib/apiClient";

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
};

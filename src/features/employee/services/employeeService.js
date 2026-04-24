import axios from 'axios';

const API_BASE_URL = '/api/employee';

export const employeeService = {
  // Get employee profile
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/me`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update employee profile
  updateProfile: async (updates) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/me`, updates);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload profile photo
  uploadPhoto: async (photoUrl) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/me/photo`, { photoUrl });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

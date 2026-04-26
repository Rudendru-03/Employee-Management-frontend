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

export const attendanceService = {
  getAttendance: async (params = {}) => {
    try {
      const response = await apiClient.get("/attendance", { params });
      return getPaginatedData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAttendanceById: async (id) => {
    try {
      const response = await apiClient.get(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createAttendance: async (data) => {
    try {
      const response = await apiClient.post("/attendance", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateAttendance: async (id, data) => {
    try {
      const response = await apiClient.put(`/attendance/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteAttendance: async (id) => {
    try {
      const response = await apiClient.delete(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

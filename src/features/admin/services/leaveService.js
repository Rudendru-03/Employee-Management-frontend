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

export const leaveService = {
  getLeaves: async (params = {}) => {
    try {
      const response = await apiClient.get("/leaves", { params });
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

  getLeaveById: async (id) => {
    try {
      const response = await apiClient.get(`/leaves/${id}`);
      return response.data;
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

  updateLeaveStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/leaves/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteLeave: async (id) => {
    try {
      const response = await apiClient.delete(`/leaves/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

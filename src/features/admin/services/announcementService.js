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

export const announcementService = {
  getAnnouncements: async (params = {}) => {
    try {
      const response = await apiClient.get("/announcements", { params });
      return getPaginatedData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMyAnnouncements: async (params = {}) => {
    try {
      const response = await apiClient.get("/announcements/me", { params });
      return getPaginatedData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAnnouncementById: async (id) => {
    try {
      const response = await apiClient.get(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createAnnouncement: async (data) => {
    try {
      const response = await apiClient.post("/announcements", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateAnnouncement: async (id, data) => {
    try {
      const response = await apiClient.put(`/announcements/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteAnnouncement: async (id) => {
    try {
      const response = await apiClient.delete(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

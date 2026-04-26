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

export const payrollService = {
  getPayrolls: async (params = {}) => {
    try {
      const response = await apiClient.get("/payroll", { params });
      return getPaginatedData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMyPayrolls: async (params = {}) => {
    try {
      const response = await apiClient.get("/payroll/me", { params });
      return getPaginatedData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPayrollById: async (id) => {
    try {
      const response = await apiClient.get(`/payroll/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createPayroll: async (data) => {
    try {
      const response = await apiClient.post("/payroll", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updatePayroll: async (id, data) => {
    try {
      const response = await apiClient.put(`/payroll/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deletePayroll: async (id) => {
    try {
      const response = await apiClient.delete(`/payroll/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

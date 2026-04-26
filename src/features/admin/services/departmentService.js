import apiClient from "../../../lib/apiClient";

const getListData = (response) => response.data?.data || response.data || [];

export const departmentService = {
  // Get all departments
  getAllDepartments: async () => {
    try {
      const response = await apiClient.get("/departments");
      return getListData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single department
  getDepartmentById: async (id) => {
    try {
      const response = await apiClient.get(`/departments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create department
  createDepartment: async (data) => {
    try {
      const response = await apiClient.post("/departments", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update department
  updateDepartment: async (id, data) => {
    try {
      const response = await apiClient.put(`/departments/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete department
  deleteDepartment: async (id) => {
    try {
      const response = await apiClient.delete(`/departments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

import axios from "axios";

const API_BASE_URL = "/api/departments";

export const departmentService = {
  // Get all departments
  getAllDepartments: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single department
  getDepartmentById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create department
  createDepartment: async (data) => {
    try {
      const response = await axios.post(API_BASE_URL, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update department
  updateDepartment: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete department
  deleteDepartment: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

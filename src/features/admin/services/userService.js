import axios from "axios";

const API_BASE_URL = "/api/admin";

export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single user
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create user
  createUser: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user
  updateUser: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user status
  updateUserStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single employee
  getEmployeeById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create employee
  createEmployee: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/employees`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update employee
  updateEmployee: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/employees/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

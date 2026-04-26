import apiClient from "../../../lib/apiClient";

const getListData = (response) => response.data?.data || response.data || [];

export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await apiClient.get("/admin/users");
      return getListData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single user
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create user
  createUser: async (data) => {
    try {
      const response = await apiClient.post("/admin/users", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user
  updateUser: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user status
  updateUserStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/admin/users/${id}/status`, {
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
      const response = await apiClient.get("/admin/employees");
      return getListData(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single employee
  getEmployeeById: async (id) => {
    try {
      const response = await apiClient.get(`/admin/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create employee
  createEmployee: async (data) => {
    try {
      const response = await apiClient.post("/admin/employees", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update employee
  updateEmployee: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/employees/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

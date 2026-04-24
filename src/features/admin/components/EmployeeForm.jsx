import React, { useState } from 'react';

const EmployeeForm = ({ onSubmit, onCancel, loading, users = [], departments = [], managers = [] }) => {
  const [formData, setFormData] = useState({
    userId: '',
    employeeId: '',
    department: '',
    reportingManager: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userId) {
      newErrors.userId = 'User is required';
    }
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (!formData.reportingManager) {
      newErrors.reportingManager = 'Reporting Manager is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        userId: '',
        employeeId: '',
        department: '',
        reportingManager: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User *
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
          {errors.userId && <p className="text-red-600 text-sm mt-1">{errors.userId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee ID *
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="e.g., EMP001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.employeeId && <p className="text-red-600 text-sm mt-1">{errors.employeeId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department *
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a department</option>
            {departments.map(dept => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reporting Manager *
          </label>
          <select
            name="reportingManager"
            value={formData.reportingManager}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a manager</option>
            {managers.map(manager => (
              <option key={manager._id} value={manager._id}>
                {manager.email}
              </option>
            ))}
          </select>
          {errors.reportingManager && <p className="text-red-600 text-sm mt-1">{errors.reportingManager}</p>}
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Employee'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

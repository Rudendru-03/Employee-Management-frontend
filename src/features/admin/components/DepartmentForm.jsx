import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const DepartmentForm = ({ onSubmit, onCancel, loading, initialData = null, managers = [] }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    manager: initialData?.manager?._id || '',
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
    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.manager) {
      newErrors.manager = 'Manager is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Department Name */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-card-foreground">
          Department Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Engineering, Sales, Marketing"
          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
        {errors.name && (
          <div className="flex items-center gap-2 text-danger text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-card-foreground">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the department and its responsibilities"
          rows="4"
          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
        />
        {errors.description && (
          <div className="flex items-center gap-2 text-danger text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.description}
          </div>
        )}
      </div>

      {/* Manager Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-card-foreground">
          Department Manager
        </label>
        <select
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        >
          <option value="">Select a manager</option>
          {managers.map(manager => (
            <option key={manager._id} value={manager._id}>
              {manager.email}
            </option>
          ))}
        </select>
        {errors.manager && (
          <div className="flex items-center gap-2 text-danger text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.manager}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : (initialData ? 'Update Department' : 'Create Department')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-background border border-border text-foreground hover:bg-background/80 rounded-lg font-medium transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;

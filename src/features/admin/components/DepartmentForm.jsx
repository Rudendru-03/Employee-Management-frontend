import React, { useState } from 'react';
import { AlertCircle, Building2, User } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="space-y-6 fade-in">
      {/* Department Name */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          <label className="block text-sm font-semibold text-foreground">
            Department Name <span className="text-danger">*</span>
          </label>
        </div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Engineering, Sales, Marketing"
          className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground placeholder-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition hover:border-border/80"
        />
        {errors.name && (
          <div className="flex items-center gap-2 text-danger text-sm bg-danger/5 p-2.5 rounded-lg border border-danger/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors.name}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Description <span className="text-danger">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the department and its responsibilities"
          rows="4"
          className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground placeholder-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none hover:border-border/80"
        />
        {errors.description && (
          <div className="flex items-center gap-2 text-danger text-sm bg-danger/5 p-2.5 rounded-lg border border-danger/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors.description}
          </div>
        )}
      </div>

      {/* Manager Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-accent-secondary" />
          <label className="block text-sm font-semibold text-foreground">
            Department Manager <span className="text-danger">*</span>
          </label>
        </div>
        <select
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition hover:border-border/80 appearance-none cursor-pointer"
        >
          <option value="">Select a manager</option>
          {managers.map(manager => (
            <option key={manager._id} value={manager._id}>
              {manager.email}
            </option>
          ))}
        </select>
        {errors.manager && (
          <div className="flex items-center gap-2 text-danger text-sm bg-danger/5 p-2.5 rounded-lg border border-danger/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors.manager}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-border/30">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white rounded-xl font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-glow-blue"
        >
          {loading ? 'Saving...' : (initialData ? 'Update Department' : 'Create Department')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 px-4 py-3 bg-background/80 border border-border/50 text-foreground hover:bg-background hover:border-border rounded-xl font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;

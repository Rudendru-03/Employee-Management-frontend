import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DepartmentForm from '../components/DepartmentForm';
import DepartmentList from '../components/DepartmentList';
import { departmentService } from '../services/departmentService';
import { userService } from '../services/userService';

const Department = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [deptData, managersData] = await Promise.all([
        departmentService.getAllDepartments(),
        userService.getAllUsers(),
      ]);
      setDepartments(deptData);
      setManagers(managersData);
    } catch (err) {
      setError(err.message || 'Failed to load departments');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingDepartment(null);
    setIsFormOpen(true);
  };

  const handleEdit = (dept) => {
    setEditingDepartment(dept);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      if (editingDepartment) {
        await departmentService.updateDepartment(editingDepartment._id, formData);
        setSuccess('Department updated successfully!');
      } else {
        await departmentService.createDepartment(formData);
        setSuccess('Department created successfully!');
      }

      setIsFormOpen(false);
      setEditingDepartment(null);
      await fetchData();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save department');
      console.error('Error saving department:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await departmentService.deleteDepartment(id);
      setSuccess('Department deleted successfully!');
      await fetchData();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete department');
      console.error('Error deleting department:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingDepartment(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
              <h1 className="text-4xl font-bold text-gray-900">Department Management</h1>
              <p className="mt-2 text-gray-600">Create, manage, and organize your departments</p>
            </div>
            {!isFormOpen && (
              <button
                onClick={handleAddNew}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
              >
                + New Department
              </button>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading departments...</p>
            </div>
          ) : (
            <>
              {/* Form Section */}
              {isFormOpen && (
                <div className="mb-8">
                  <DepartmentForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                    loading={saving}
                    initialData={editingDepartment}
                    managers={managers}
                  />
                </div>
              )}

              {/* List Section */}
              {!isFormOpen && (
                <DepartmentList
                  departments={departments}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  loading={saving}
                  onAddNew={handleAddNew}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Department;

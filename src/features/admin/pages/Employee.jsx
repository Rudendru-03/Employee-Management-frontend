import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import AdminModal from '../components/AdminModal';
import { userService, employeeService } from '../services/userService';
import { departmentService } from '../services/departmentService';

const Employee = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('employees');
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [showUserForm, setShowUserForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [usersData, employeesData, deptsData] = await Promise.all([
        userService.getAllUsers(),
        employeeService.getAllEmployees(),
        departmentService.getAllDepartments(),
      ]);
      
      setUsers(usersData);
      setEmployees(employeesData);
      setDepartments(deptsData);
      
      // Get managers from departments
      const managerIds = new Set();
      deptsData.forEach(dept => {
        if (dept.manager) {
          managerIds.add(dept.manager._id || dept.manager);
        }
      });
      
      // Get unique managers from users
      const managerUsers = usersData.filter(user => managerIds.has(user._id));
      setManagers(managerUsers.length > 0 ? managerUsers : usersData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await userService.createUser(formData);
      setSuccess('User created successfully!');
      setShowUserForm(false);
      await fetchData();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to create user');
      console.error('Error creating user:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateUserStatus = async (userId, newStatus) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await userService.updateUserStatus(userId, newStatus);
      setSuccess(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
      await fetchData();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update user status');
      console.error('Error updating user status:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateEmployee = async (formData) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await employeeService.createEmployee(formData);
      setSuccess('Employee created successfully!');
      setShowEmployeeForm(false);
      await fetchData();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to create employee');
      console.error('Error creating employee:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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
              <h1 className="text-4xl font-bold text-gray-900">Employee & User Management</h1>
              <p className="mt-2 text-gray-600">Create users and manage employee assignments</p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
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
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('employees')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'employees'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Employees
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading data...</p>
            </div>
          ) : (
            <>
              {/* Employees Tab */}
              {activeTab === 'employees' && (
                <div>
                  {!showEmployeeForm && (
                    <div className="mb-6">
                      <button
                        onClick={() => setShowEmployeeForm(true)}
                        disabled={loading}
                        className="px-6 py-3 bg-sky-400 text-slate-900 rounded-3xl hover:bg-sky-300 transition font-semibold disabled:opacity-50"
                      >
                        + New Employee
                      </button>
                    </div>
                  )}

                  <AdminModal isOpen={showEmployeeForm} onClose={() => setShowEmployeeForm(false)} title="Create New Employee">
                    <EmployeeForm
                      onSubmit={handleCreateEmployee}
                      onCancel={() => setShowEmployeeForm(false)}
                      loading={saving}
                      users={users}
                      departments={departments}
                      managers={managers}
                    />
                  </AdminModal>

                  <EmployeeList employees={employees} loading={saving} />
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div>
                  {!showUserForm && (
                    <div className="mb-6">
                      <button
                        onClick={() => setShowUserForm(true)}
                        disabled={loading}
                        className="px-6 py-3 bg-sky-400 text-slate-900 rounded-3xl hover:bg-sky-300 transition font-semibold disabled:opacity-50"
                      >
                        + New User
                      </button>
                    </div>
                  )}

                  <AdminModal isOpen={showUserForm} onClose={() => setShowUserForm(false)} title="Create New User">
                    <UserForm onSubmit={handleCreateUser} onCancel={() => setShowUserForm(false)} loading={saving} />
                  </AdminModal>

                  <UserList
                    users={users}
                    onStatusChange={handleUpdateUserStatus}
                    loading={saving}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;

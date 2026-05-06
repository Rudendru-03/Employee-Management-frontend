import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DepartmentForm from '../components/DepartmentForm';
import DepartmentList from '../components/DepartmentList';
import Modal from '../../../components/Modal';
import { departmentService } from '../services/departmentService';
import { userService } from '../services/userService';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Plus, Trash2, Edit2, Users } from 'lucide-react';

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
  const hasFetchedInitialData = useRef(false);

  useEffect(() => {
    if (hasFetchedInitialData.current) return;
    hasFetchedInitialData.current = true;
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

  // Hardcoded analytics data for departments
  const departmentAnalytics = [
    { name: 'Engineering', employees: 45, budget: 250000 },
    { name: 'Sales', employees: 28, budget: 180000 },
    { name: 'Marketing', employees: 22, budget: 120000 },
    { name: 'HR', employees: 15, budget: 90000 },
    { name: 'Operations', employees: 18, budget: 100000 },
  ];

  const chartColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-background rounded-lg transition text-muted hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="slide-up">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Department Management</h1>
                <p className="text-muted-light mt-2">Create, manage, and organize your departments with analytics</p>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition disabled:opacity-50 slide-up"
            >
              <Plus className="w-4 h-4" />
              New Department
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {success && (
          <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-lg text-success text-sm font-medium fade-in">
            ✓ {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-medium fade-in">
            ✕ {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-light font-medium">Loading departments...</p>
          </div>
        ) : (
          <>
            {/* Analytics Section */}
            {departments.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Department Headcount Chart */}
                <div className="bg-card border border-border rounded-2xl p-6 slide-up">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Employees by Department
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" stroke="var(--muted)" />
                      <YAxis stroke="var(--muted)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px"
                        }}
                        labelStyle={{ color: "var(--foreground)" }}
                      />
                      <Bar dataKey="employees" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Budget Distribution */}
                <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
                  <h2 className="text-xl font-bold text-foreground mb-4">Budget Distribution</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentAnalytics}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, budget }) => `${name}: $${(budget/1000).toFixed(0)}K`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="budget"
                      >
                        {departmentAnalytics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={chartColors[index]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px"
                        }}
                        labelStyle={{ color: "var(--foreground)" }}
                        formatter={(value) => `$${(value/1000).toFixed(0)}K`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            {departments.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-card border border-border rounded-xl p-6 slide-up">
                  <p className="text-muted text-sm font-medium">Total Departments</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{departments.length}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "50ms" }}>
                  <p className="text-muted text-sm font-medium">Total Employees</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{departmentAnalytics.reduce((sum, dept) => sum + dept.employees, 0)}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
                  <p className="text-muted text-sm font-medium">Total Budget</p>
                  <p className="text-3xl font-bold text-foreground mt-2">${(departmentAnalytics.reduce((sum, dept) => sum + dept.budget, 0) / 1000).toFixed(0)}K</p>
                </div>
              </div>
            )}

            {/* Department List */}
            {departments.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <Users className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground">No departments yet</h3>
                <p className="text-muted mt-2">Create your first department to get started</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition"
                >
                  Create Department
                </button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-light">Department</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-light">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-light">Manager</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-muted-light">Employees</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-muted-light">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((dept, idx) => (
                        <tr key={dept._id} className="border-b border-border hover:bg-background/50 transition">
                          <td className="px-6 py-4">
                            <span className="font-semibold text-foreground">{dept.name}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-muted line-clamp-1 text-sm">{dept.description}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-muted text-sm">{dept.manager?.email || 'Unassigned'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-foreground font-medium">{departmentAnalytics.find(d => d.name === dept.name)?.employees || 0}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(dept)}
                                disabled={saving}
                                className="p-2 hover:bg-primary/10 rounded-lg transition text-primary disabled:opacity-50"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete "${dept.name}" department?`)) {
                                    handleDelete(dept._id);
                                  }
                                }}
                                disabled={saving}
                                className="p-2 hover:bg-danger/10 rounded-lg transition text-danger disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal for Form */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCancel}
        title={editingDepartment ? 'Edit Department' : 'Create New Department'}
        size="lg"
      >
        <DepartmentForm
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          loading={saving}
          initialData={editingDepartment}
          managers={managers}
        />
      </Modal>
    </div>
  );
};

export default Department;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveFilters from "../components/LeaveFilters";
import LeaveForm from "../components/LeaveForm";
import LeavePagination from "../components/LeavePagination";
import LeaveTable from "../components/LeaveTable";
import Modal from "../../../components/Modal";
import { leaveService } from "../services/leaveService";
import { userService } from "../services/userService";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, Plus, Clock, CheckCircle, XCircle } from "lucide-react";

const defaultFilters = {
  userId: "",
  leaveType: "",
  status: "",
};

const defaultPagination = {
  total: 0,
  limit: 10,
  offset: 0,
  hasNext: false,
  hasPrev: false,
};

const buildQuery = (filters, offset) => {
  const query = {
    limit: defaultPagination.limit,
    offset,
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (value) query[key] = value;
  });

  return query;
};

const LeaveManagement = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState(defaultPagination);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const lastFetchKey = useRef("");
  const hasFetchedUsers = useRef(false);

  const summary = useMemo(() => {
    return leaves.reduce(
      (acc, leave) => {
        acc[leave.status] = (acc[leave.status] || 0) + 1;
        return acc;
      },
      { pending: 0, approved: 0, rejected: 0 },
    );
  }, [leaves]);

  const fetchLeaves = async (nextFilters = filters, nextOffset = offset) => {
    try {
      setLoading(true);
      setError("");
      const result = await leaveService.getLeaves(buildQuery(nextFilters, nextOffset));
      setLeaves(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Failed to load leave requests");
      console.error("Error fetching leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err.message || "Failed to load users");
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    const fetchKey = JSON.stringify({ filters, offset });
    if (lastFetchKey.current === fetchKey) return;
    lastFetchKey.current = fetchKey;
    fetchLeaves(filters, offset);
  }, [filters, offset]);

  useEffect(() => {
    if (hasFetchedUsers.current) return;
    hasFetchedUsers.current = true;
    fetchUsers();
  }, []);

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
    setOffset(0);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setOffset(0);
  };

  const handleCreateLeave = async (formData) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await leaveService.applyLeave(formData);
      setSuccess("Leave request submitted successfully!");
      setIsFormOpen(false);
      await fetchLeaves(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to submit leave request");
      console.error("Error creating leave:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (leave, status) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await leaveService.updateLeaveStatus(leave._id, status);
      setSuccess(`Leave request marked as ${status}.`);
      await fetchLeaves(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update leave status");
      console.error("Error updating leave:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (leave) => {
    if (!window.confirm(`Delete leave request for ${leave.userId?.email || "this employee"}?`)) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await leaveService.deleteLeave(leave._id);
      setSuccess("Leave request deleted successfully!");
      await fetchLeaves(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete leave request");
      console.error("Error deleting leave:", err);
    } finally {
      setSaving(false);
    }
  };

  // Hardcoded analytics data
  const leavesByType = [
    { name: "Sick Leave", value: summary.pending, color: "#ef4444" },
    { name: "Vacation", value: 25, color: "#3b82f6" },
    { name: "Personal", value: 12, color: "#10b981" },
    { name: "Maternity", value: 3, color: "#f59e0b" },
  ];

  const monthlyLeaveData = [
    { month: "Jan", approved: 18, pending: 4, rejected: 2 },
    { month: "Feb", approved: 22, pending: 3, rejected: 1 },
    { month: "Mar", approved: 25, pending: 5, rejected: 2 },
    { month: "Apr", approved: 20, pending: 6, rejected: 1 },
    { month: "May", approved: 23, pending: summary.pending, rejected: 1 },
  ];

  const chartColors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 hover:bg-background rounded-lg transition text-muted hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="slide-up">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Leave Management</h1>
                <p className="text-muted-light mt-2">Review leave requests and track team availability</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsFormOpen(true);
                setError("");
              }}
              disabled={loading || isFormOpen}
              className="flex items-center gap-2 px-4 py-2.5 bg-warning hover:bg-warning text-white rounded-lg font-medium transition disabled:opacity-50 slide-up"
            >
              <Plus className="w-4 h-4" />
              Create Request
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 slide-up">
            <p className="text-muted text-sm font-medium">Total Requests</p>
            <p className="text-3xl font-bold text-foreground mt-2">{leaves.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-warning mt-2">{summary.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-success mt-2">{summary.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Rejected</p>
                <p className="text-3xl font-bold text-danger mt-2">{summary.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-danger" />
            </div>
          </div>
        </div>

        {/* Analytics */}
        {leaves.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Leave Trend */}
            <div className="bg-card border border-border rounded-2xl p-6 slide-up">
              <h2 className="text-xl font-bold text-foreground mb-4">Monthly Requests</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyLeaveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted)" />
                  <YAxis stroke="var(--muted)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px"
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Bar dataKey="approved" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="rejected" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Leave Type Distribution */}
            <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
              <h2 className="text-xl font-bold text-foreground mb-4">Requests by Type</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={leavesByType.filter(item => item.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leavesByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px"
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Filters and Table */}
        <div className="space-y-6">
          <LeaveFilters
            filters={filters}
            users={users}
            loading={loading}
            onChange={handleFiltersChange}
            onReset={handleResetFilters}
          />

          {loading ? (
            <div className="bg-card border border-border rounded-2xl py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-light font-medium">Loading leave requests...</p>
            </div>
          ) : (
            <>
              <LeaveTable
                leaves={leaves}
                loading={saving}
                onAddNew={() => setIsFormOpen(true)}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
              <LeavePagination
                pagination={pagination}
                loading={loading}
                onPageChange={setOffset}
              />
            </>
          )}
        </div>
      </main>

      {/* Modal for Form */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setError("");
        }}
        title="Create Leave Request"
        size="lg"
      >
        <LeaveForm
          loading={saving}
          onCancel={() => {
            setIsFormOpen(false);
            setError("");
          }}
          onSubmit={handleCreateLeave}
        />
      </Modal>
    </div>
  );
};

export default LeaveManagement;

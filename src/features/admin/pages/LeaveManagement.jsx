import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveFilters from "../components/LeaveFilters";
import LeaveForm from "../components/LeaveForm";
import LeavePagination from "../components/LeavePagination";
import LeaveTable from "../components/LeaveTable";
import { leaveService } from "../services/leaveService";
import { userService } from "../services/userService";

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-4 inline-flex items-center font-medium text-amber-700 hover:text-amber-900"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Leave Management</h1>
            <p className="mt-2 text-gray-600">
              Review leave requests, update approval status, and track team availability.
            </p>
          </div>

          {!isFormOpen && (
            <button
              onClick={() => {
                setIsFormOpen(true);
                setError("");
              }}
              disabled={loading}
              className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
            >
              + Create Leave Request
            </button>
          )}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm font-medium text-gray-500">Visible Requests</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{leaves.length}</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-amber-700">{summary.pending}</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm font-medium text-gray-500">Approved</p>
            <p className="mt-2 text-3xl font-bold text-green-700">{summary.approved}</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm font-medium text-gray-500">Rejected</p>
            <p className="mt-2 text-3xl font-bold text-red-700">{summary.rejected}</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-800">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {isFormOpen ? (
            <LeaveForm
              loading={saving}
              onCancel={() => {
                setIsFormOpen(false);
                setError("");
              }}
              onSubmit={handleCreateLeave}
            />
          ) : (
            <>
              <LeaveFilters
                filters={filters}
                users={users}
                loading={loading}
                onChange={handleFiltersChange}
                onReset={handleResetFilters}
              />

              {loading ? (
                <div className="rounded-lg bg-white py-12 text-center shadow">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-amber-500"></div>
                  <p className="mt-4 font-medium text-gray-600">Loading leave requests...</p>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;

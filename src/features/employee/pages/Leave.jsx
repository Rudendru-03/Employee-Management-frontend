import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeePagination from "../components/EmployeePagination";
import { employeeService } from "../services/employeeService";

const defaultFilters = {
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

const statusClasses = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const typeClasses = {
  sick: "bg-rose-100 text-rose-800",
  casual: "bg-sky-100 text-sky-800",
  paid: "bg-violet-100 text-violet-800",
};

const today = () => new Date().toISOString().slice(0, 10);
const toIsoDate = (value) => new Date(`${value}T00:00`).toISOString();

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getDays = (fromDate, toDate) => {
  if (!fromDate || !toDate) return "N/A";
  const days = Math.round((new Date(toDate) - new Date(fromDate)) / 86400000) + 1;
  return `${Math.max(days, 1)} day${days === 1 ? "" : "s"}`;
};

const buildQuery = (filters, offset) => {
  const query = { limit: defaultPagination.limit, offset };
  Object.entries(filters).forEach(([key, value]) => {
    if (value) query[key] = value;
  });
  return query;
};

const EmployeeLeave = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState(defaultPagination);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: "casual",
    fromDate: today(),
    toDate: today(),
    reason: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const lastFetchKey = useRef("");

  const summary = useMemo(
    () =>
      leaves.reduce(
        (acc, leave) => {
          acc[leave.status] = (acc[leave.status] || 0) + 1;
          return acc;
        },
        { pending: 0, approved: 0, rejected: 0 },
      ),
    [leaves],
  );

  const fetchLeaves = async (nextFilters = filters, nextOffset = offset) => {
    try {
      setLoading(true);
      setError("");
      const result = await employeeService.getMyLeaves(buildQuery(nextFilters, nextOffset));
      setLeaves(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Failed to load leave requests");
      console.error("Error fetching leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchKey = JSON.stringify({ filters, offset });
    if (lastFetchKey.current === fetchKey) return;
    lastFetchKey.current = fetchKey;
    fetchLeaves(filters, offset);
  }, [filters, offset]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setOffset(0);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setOffset(0);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.fromDate) nextErrors.fromDate = "From date is required";
    if (!formData.toDate) nextErrors.toDate = "To date is required";
    if (formData.fromDate && formData.toDate && formData.toDate < formData.fromDate) {
      nextErrors.toDate = "To date cannot be before from date";
    }
    if (formData.reason.trim().length < 5) {
      nextErrors.reason = "Reason must be at least 5 characters";
    }
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleApplyLeave = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await employeeService.applyLeave({
        leaveType: formData.leaveType,
        fromDate: toIsoDate(formData.fromDate),
        toDate: toIsoDate(formData.toDate),
        reason: formData.reason.trim(),
      });
      setSuccess("Leave request submitted successfully!");
      setShowForm(false);
      setFormData({
        leaveType: "casual",
        fromDate: today(),
        toDate: today(),
        reason: "",
      });
      await fetchLeaves(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to submit leave request");
      console.error("Error applying leave:", err);
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
              className="mb-4 inline-flex items-center font-medium text-yellow-700 hover:text-yellow-900"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900">My Leave</h1>
            <p className="mt-2 text-gray-600">Apply for leave and track approval status after review.</p>
          </div>

          {!showForm && (
            <button
              onClick={() => {
                setShowForm(true);
                setError("");
              }}
              disabled={loading}
              className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-50"
            >
              + Apply Leave
            </button>
          )}
        </div>

        {!showForm && (
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
        )}

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
          {showForm ? (
            <form onSubmit={handleApplyLeave} className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Apply for Leave</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Submit leave type, dates, and reason. Approval status is handled by admin or manager.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Leave Type</label>
                  <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 capitalize focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="casual">Casual</option>
                    <option value="sick">Sick</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">From Date *</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {formErrors.fromDate && <p className="mt-1 text-sm text-red-600">{formErrors.fromDate}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">To Date *</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {formErrors.toDate && <p className="mt-1 text-sm text-red-600">{formErrors.toDate}</p>}
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">Reason *</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  rows="4"
                  placeholder="Add a clear reason for your leave request"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {formErrors.reason && <p className="mt-1 text-sm text-red-600">{formErrors.reason}</p>}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-yellow-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-50"
                >
                  {saving ? "Submitting..." : "Submit Leave Request"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                  disabled={saving}
                  className="rounded-lg bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="rounded-lg bg-white p-5 shadow">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Leave Type</label>
                    <select
                      name="leaveType"
                      value={filters.leaveType}
                      onChange={handleFilterChange}
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 capitalize focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100"
                    >
                      <option value="">All types</option>
                      <option value="sick">Sick</option>
                      <option value="casual">Casual</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 capitalize focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100"
                    >
                      <option value="">All statuses</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={resetFilters}
                      disabled={loading}
                      className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-300 disabled:opacity-50"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="rounded-lg bg-white py-12 text-center shadow">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-yellow-500"></div>
                  <p className="mt-4 font-medium text-gray-600">Loading leave requests...</p>
                </div>
              ) : leaves.length === 0 ? (
                <div className="rounded-lg bg-white p-12 text-center shadow">
                  <h3 className="text-lg font-medium text-gray-900">No leave requests</h3>
                  <p className="mt-1 text-sm text-gray-500">Apply for leave to start tracking your requests.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Dates</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Reason</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Approved By</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {leaves.map((leave) => (
                            <tr key={leave._id} className="hover:bg-gray-50">
                              <td className="whitespace-nowrap px-6 py-4">
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${typeClasses[leave.leaveType] || "bg-gray-100 text-gray-800"}`}>
                                  {leave.leaveType}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                <div>{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</div>
                                <div className="mt-1 text-xs font-medium text-gray-500">{getDays(leave.fromDate, leave.toDate)}</div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                <div className="max-w-xs truncate" title={leave.reason}>{leave.reason}</div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[leave.status] || "bg-gray-100 text-gray-800"}`}>
                                  {leave.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">{leave.approvedBy?.email || "N/A"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <EmployeePagination
                    label="leave requests"
                    loading={loading}
                    pagination={pagination}
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

export default EmployeeLeave;

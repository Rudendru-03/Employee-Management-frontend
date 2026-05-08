import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeePagination from "../components/EmployeePagination";
import AdminModal from '../../admin/components/AdminModal';
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-4 inline-flex items-center font-medium text-amber-300 hover:text-amber-200"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-white">My Leave</h1>
            <p className="mt-2 text-slate-300">Apply for leave and track approval status after review.</p>
          </div>

          {!showForm && (
            <button
              onClick={() => {
                setShowForm(true);
                setError("");
              }}
              disabled={loading}
              className="rounded-3xl bg-amber-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-amber-300 disabled:opacity-50"
            >
              + Apply Leave
            </button>
          )}
        </div>

        {!showForm && (
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
              <p className="text-sm font-medium text-slate-400">Visible Requests</p>
              <p className="mt-2 text-3xl font-bold text-white">{leaves.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
              <p className="text-sm font-medium text-slate-400">Pending</p>
              <p className="mt-2 text-3xl font-bold text-amber-400">{summary.pending}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
              <p className="text-sm font-medium text-slate-400">Approved</p>
              <p className="mt-2 text-3xl font-bold text-emerald-400">{summary.approved}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
              <p className="text-sm font-medium text-slate-400">Rejected</p>
              <p className="mt-2 text-3xl font-bold text-rose-400">{summary.rejected}</p>
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
            <AdminModal isOpen={showForm} onClose={() => { setShowForm(false); setError(''); }} title="Apply for Leave">
              <form onSubmit={handleApplyLeave} className="rounded-2xl bg-slate-900/80 p-6 shadow">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">Apply for Leave</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    Submit leave type, dates, and reason. Approval status is handled by admin or manager.
                  </p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Leave Type</label>
                    <select
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-slate-700 px-4 py-2 capitalize bg-slate-800/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="casual">Casual</option>
                      <option value="sick">Sick</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">From Date *</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-slate-700 px-4 py-2 bg-slate-800/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    {formErrors.fromDate && <p className="mt-1 text-sm text-rose-400">{formErrors.fromDate}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">To Date *</label>
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleFormChange}
                      className="w-full rounded-lg border border-slate-700 px-4 py-2 bg-slate-800/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    {formErrors.toDate && <p className="mt-1 text-sm text-rose-400">{formErrors.toDate}</p>}
                  </div>
                </div>
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-slate-300">Reason *</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleFormChange}
                    rows="4"
                    placeholder="Add a clear reason for your leave request"
                    className="w-full rounded-lg border border-slate-700 px-4 py-2 bg-slate-800/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  {formErrors.reason && <p className="mt-1 text-sm text-rose-400">{formErrors.reason}</p>}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-3xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 disabled:opacity-50"
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
                    className="rounded-3xl bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
                  >
                    Cancel
                  </button>
              </div>
              </form>
              </AdminModal>
            ) : (
            <>
                <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">Leave Type</label>
                      <select
                        name="leaveType"
                        value={filters.leaveType}
                        onChange={handleFilterChange}
                        disabled={loading}
                        className="w-full rounded-lg border border-slate-700 px-4 py-2 capitalize bg-slate-800/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
                      >
                      <option value="">All types</option>
                      <option value="sick">Sick</option>
                      <option value="casual">Casual</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">Status</label>
                      <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        disabled={loading}
                        className="w-full rounded-lg border border-slate-700 px-4 py-2 capitalize bg-slate-800/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
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
                        className="w-full rounded-3xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="rounded-3xl bg-slate-900/60 py-12 text-center shadow">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-amber-400"></div>
                  <p className="mt-4 font-medium text-slate-300">Loading leave requests...</p>
                </div>
              ) : leaves.length === 0 ? (
                <div className="rounded-3xl bg-slate-900/60 p-12 text-center shadow">
                  <h3 className="text-lg font-medium text-white">No leave requests</h3>
                  <p className="mt-1 text-sm text-slate-400">Apply for leave to start tracking your requests.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-hidden rounded-2xl bg-slate-900/50 shadow">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-800">
                        <thead className="bg-slate-800/50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Dates</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Reason</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Approved By</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                          {leaves.map((leave) => (
                            <tr key={leave._id} className="hover:bg-slate-800/40">
                              <td className="whitespace-nowrap px-6 py-4">
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${typeClasses[leave.leaveType] || "bg-slate-700 text-slate-200"}`}>
                                  {leave.leaveType}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                                <div>{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</div>
                                <div className="mt-1 text-xs font-medium text-slate-400">{getDays(leave.fromDate, leave.toDate)}</div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-300">
                                <div className="max-w-xs truncate" title={leave.reason}>{leave.reason}</div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[leave.status] || "bg-slate-700 text-slate-200"}`}>
                                  {leave.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-300">{leave.approvedBy?.email || "N/A"}</td>
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
